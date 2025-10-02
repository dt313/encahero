import { useEffect, useState } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { changeStatus } from '@/store/action/learning-list-action';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { useDispatch, useSelector } from 'react-redux';

import { collectionService } from '@/services';

import { ThemedText } from './ThemedText';
import Button from './button';

type StopListType = {
    title?: string;
    containerStyle?: ViewStyle;
};

type StopItemType = {
    id: number;

    name: string;
    masteredCount: number;
    cardCount: number;
};

const StopItem = ({ id, name, masteredCount, cardCount }: StopItemType) => {
    const dispatch = useDispatch();
    const continueCollection = async (id: number) => {
        const res = await collectionService.changeStatusOfCollection(id, 'in_progress');
        if (res) {
            dispatch(changeStatus({ id: id, status: 'in_progress' }));
        }
    };
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
                onPress={() => continueCollection(id)}
            >
                Continue
            </Button>
        </View>
    );
};

function StopList({ title, containerStyle }: StopListType) {
    const [stopList, setStopList] = useState<CollectionProgress[]>([]);
    const collections = useSelector((state: any) => state.learningList.collections);
    useEffect(() => {
        setStopList(collections.filter((item: CollectionProgress) => item.status === 'stopped'));
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
                        <StopItem
                            key={item.id}
                            id={item.collection_id}
                            name={item.collection.name}
                            masteredCount={item.mastered_card_count ?? 0}
                            cardCount={item.collection.card_count ?? 0}
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
        backgroundColor: '#FF6B6B',
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

export default StopList;
