import { useEffect, useState } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { useRouter } from 'expo-router';

import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { useSelector } from 'react-redux';

import { ThemedText } from './ThemedText';
import Button from './button';

type CompletedListType = {
    title?: string;
    containerStyle?: ViewStyle;
};

type CompletedItemType = {
    id: number;

    name: string;
    masteredCount: number;
    cardCount: number;
};

const CompletedListItem = ({ id, name, masteredCount, cardCount }: CompletedItemType) => {
    const router = useRouter();
    return (
        <View style={[styles.item]}>
            <ThemedText type="defaultSemiBold" style={styles.itemName} numberOfLines={1}>
                {name}
            </ThemedText>

            <ThemedText numberOfLines={1}>
                {masteredCount}/{cardCount} cards
            </ThemedText>

            <Button
                buttonStyle={{ marginTop: 24, backgroundColor: '#fff', paddingVertical: 4 }}
                textStyle={{ color: '#333' }}
                onPress={() => router.replace(`/quiz/${id}?mode="review"`)}
            >
                Review
            </Button>
        </View>
    );
};

function CompletedList({ title, containerStyle }: CompletedListType) {
    const [stopList, setStopList] = useState<CollectionProgress[]>([]);
    const collections = useSelector((state: any) => state.learningList.collections);
    useEffect(() => {
        setStopList(collections.filter((item: CollectionProgress) => item.status === 'completed'));
    }, [collections]);

    if (stopList.length === 0) {
        return null;
    }

    return (
        <View style={[containerStyle]}>
            <ThemedText type="subtitle">{title}</ThemedText>
            <View style={styles.body}>
                {stopList.map((item: any, index: number) => {
                    return (
                        <CompletedListItem
                            key={item.id}
                            id={item.collection_id}
                            name={item.collection.name}
                            masteredCount={item.mastered_card_count ?? 0}
                            cardCount={item.card_count ?? 100}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        marginTop: 20,
        rowGap: 8,
        columnGap: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        backgroundColor: '#BBDCE5',
        borderRadius: 12,
        width: '48%',
        padding: 20,
        paddingBottom: 24,
        overflow: 'hidden',
    },
    itemName: {
        marginRight: 8,
        flex: 1,
        textOverflow: 'es',
    },
});

export default CompletedList;
