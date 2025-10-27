import React, { useEffect, useState } from 'react';

import { SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { changeStatus, decreaseMasteredCount } from '@/store/action/learning-list-action';
import { RootState } from '@/store/reducers';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import BackIcon from '@/components/back-icon';
import CardModal from '@/components/card-modal';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { collectionService } from '@/services';

function CardList() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const backgroundColor = useThemeColor({}, 'background');
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    const lighterText = useThemeColor({}, 'lighterText');

    const { id, type } = useLocalSearchParams<{ id: string; type?: 'all' | 'learning' | 'mastered' }>();
    const [filter, setFilter] = useState<'all' | 'learning' | 'mastered'>(type || 'all');
    const [cards, setCards] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedWord, setSelectedWord] = useState<any>(null);
    const { showErrorToast, showSuccessToast } = useToast();
    const collections = useSelector((state: RootState) => state.learningList.collections);
    const [collection, setCollection] = useState<CollectionProgress | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const col = collections?.find((c: CollectionProgress) => c.collection_id === Number(id));
        if (col) setCollection(col);
    }, [collections, id]);

    // TODO:  use debounce here
    const filteredData = cards
        .map((section) => ({
            ...section,
            data: section.data.filter((word: any) => {
                const matchesSearch = word.en_word.toLowerCase().includes(search.toLowerCase());

                const matchesFilter =
                    filter === 'all' ||
                    (filter === 'learning' && word.stats?.status === 'active') ||
                    (filter === 'mastered' && word.stats?.status === 'mastered');

                return matchesSearch && matchesFilter;
            }),
        }))
        .filter((section) => section.data.length > 0);

    const sectionFormat = (rawData: any) => {
        const sectionData = rawData.reduce(
            (acc: { title: string; data: typeof rawData }[], item: (typeof rawData)[number]) => {
                const firstLetter = item.en_word[0].toUpperCase();
                let section = acc.find((s) => s.title === firstLetter);

                if (section) {
                    section.data.push(item);
                } else {
                    acc.push({ title: firstLetter, data: [item] });
                }

                return acc;
            },
            [],
        );

        return sectionData;
    };
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await collectionService.getCardsFromCollection(id);

                if (res && Array.isArray(res)) {
                    const sectionData = sectionFormat(res);

                    setCards(sectionData);
                }
            } catch (err) {
                showErrorToast(err || 'Error fetching cards');
            }
        };

        fetchApi();
    }, [id]);

    const handlePressWord = (item: any) => {
        setSelectedWord(item);
        setModalVisible(true);
    };

    const handleRemoveMastered = async () => {
        if (!id || !selectedWord) return;
        try {
            const res = await collectionService.changeStatusOfCard(
                Number(selectedWord?.collection?.id),
                selectedWord.id,
                'active',
            );

            if (res) {
                if (collection?.status === 'completed' && res.collectionCompleted === false) {
                    // update collection status to in_progress
                    dispatch(changeStatus({ id: collection.collection_id, status: 'in_progress' }));
                }
                // update local state
                const updatedCards = cards.map((section) => ({
                    ...section,
                    data: section.data.map((word: any) =>
                        word.id === selectedWord.id ? { ...word, stats: { ...word.stats, status: 'active' } } : word,
                    ),
                }));
                setCards(updatedCards);
                setSelectedWord({ ...selectedWord, stats: { ...selectedWord.stats, status: 'active' } });
                setModalVisible(false);
                showSuccessToast('Removed from mastered successfully');
                dispatch(decreaseMasteredCount(Number(id)));
            }
        } catch (err) {
            showErrorToast(err || 'Error removing from mastered');
            return;
        }
    };

    if (!id)
        return (
            <SafeAreaView
                style={[styles.container, { backgroundColor, justifyContent: 'center', alignItems: 'center' }]}
            >
                <ThemedText style={{ padding: 16 }} type="subtitle">
                    Collection ID is required
                </ThemedText>
            </SafeAreaView>
        );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <View style={styles.header}>
                <BackIcon onPress={() => router.back()} />
                <TextInput
                    style={[styles.searchInput, { backgroundColor: white, color: textColor }]}
                    placeholder="Search words..."
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor={lighterText}
                />
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                {['all', 'learning', 'mastered'].map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
                        onPress={() => setFilter(f as any)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                            {f.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Body */}
            {filteredData.length > 0 ? (
                <SectionList
                    sections={filteredData || []}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handlePressWord(item)}>
                            <ThemedText style={styles.word}>{item.en_word}</ThemedText>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
                    )}
                />
            ) : (
                <ThemedText style={{ padding: 16, textAlign: 'center' }}>No words found</ThemedText>
            )}

            <CardModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                word={selectedWord}
                onRemove={handleRemoveMastered}
            />
        </SafeAreaView>
    );
}

export default CardList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#92929244',
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: '#92929244',
        fontWeight: 'bold',
        fontSize: 16,
    },
    item: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#92929244',
    },
    word: {
        fontSize: 16,
        textTransform: 'capitalize',
        fontWeight: '400',
    },

    // filter
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
    },
    filterBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#eee',
        marginHorizontal: 4,
    },
    filterBtnActive: {
        backgroundColor: '#007AFF',
    },
    filterText: {
        fontSize: 14,
        color: '#333',
    },
    filterTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
});
