import { StyleSheet, View, ViewStyle } from 'react-native';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    const queryClient = useQueryClient();

    const { mutate: continueCollection } = useMutation({
        mutationFn: (id: number) => collectionService.changeStatusOfCollection(id, 'in_progress'),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['stopList'],
            });
        },
    });

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
    const {
        data: learningList = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['stopList'],
        queryFn: collectionService.getStopCollections,
        refetchOnWindowFocus: true,
    });

    if (learningList.length === 0) {
        return null;
    }

    return (
        <View style={[containerStyle]}>
            <ThemedText type="subtitle">{title}</ThemedText>
            <View style={styles.body}>
                {learningList.map((item: any, index: number) => {
                    return (
                        <StopItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
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
