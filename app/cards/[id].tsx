import React, { useEffect, useState } from 'react';

import { Image, Modal, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import BackIcon from '@/components/back-icon';
import Button from '@/components/button';
import CardStats from '@/components/card-stats';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { collectionService } from '@/services';

// bạn đã có BackIcon trong project

type WordItem = {
    title: string;
    data: string[];
};

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

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.content}>
                            {selectedWord?.image_url && (
                                <Image
                                    source={{
                                        uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
                                    }}
                                    style={styles.modalImage}
                                />
                            )}
                            <ThemedText style={styles.modalTitle}>{selectedWord?.en_word}</ThemedText>
                            {/* <ThemedText style={styles.modalSubtitle}>{selectedWord?.vn_word}</ThemedText> */}
                            <ThemedText style={styles.modalMeaning}>{selectedWord?.meaning}</ThemedText>
                            {/* {selectedWord?.ex?.map((ex: string, i: number) => (
                                <ThemedText key={i} style={styles.modalExample}>
                                    - {ex}
                                </ThemedText>
                            ))} */}

                            {selectedWord?.stats && (
                                <CardStats
                                    status={selectedWord.stats.status}
                                    rating={selectedWord.stats.rating}
                                    learned_count={selectedWord.stats.learned_count}
                                />
                            )}
                        </View>

                        <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
                            <HugeiconsIcon icon={Cancel01Icon} />
                        </TouchableOpacity>

                        {selectedWord?.stats?.status === 'mastered' && (
                            <Button
                                buttonStyle={{ borderRadius: 50, backgroundColor: '#f05b5b22' }}
                                onPress={handleRemoveMastered}
                            >
                                Remove from mastered
                            </Button>
                        )}
                    </View>
                </View>
            </Modal>
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

    // modal

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingTop: 40,
        padding: 16,

        // shadow iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // elevation Android
        elevation: 8,
    },
    content: {
        alignItems: 'center',
        marginBottom: 16,
    },
    modalImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    modalMeaning: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalExample: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        padding: 6,
        backgroundColor: '#eee',
        borderRadius: 12,
    },

    closeIconText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    progressContainer: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    progressText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
});
