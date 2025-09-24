import React, { useEffect, useRef, useState } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { RootState } from '@/store/reducers';
import { FlatList } from 'react-native-gesture-handler';
import { Bar, Circle } from 'react-native-progress';
import { useSelector } from 'react-redux';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

type Deck = {
    id: string;
    name: string;
    todayCount: number;
    taskCount: number;
    cardCount: number;
    masteredCardCount: number;
    isActive: boolean;
    onPress: () => void;
};

export function DeckCard({ id, name, cardCount, masteredCardCount, todayCount, taskCount, isActive, onPress }: Deck) {
    const cardBackground = useThemeColor({}, 'learningListCardBg');
    const activeCardBackground = useThemeColor({}, 'learningListCardActiveBg');
    const learningListCardActiveTextColor = useThemeColor({}, 'learningListCardActiveTextColor');
    const learningListCardBorderColor = useThemeColor({}, 'learningListCardBorderColor');
    const learningListCardPrimaryColor = useThemeColor({}, 'learningListCardPrimaryColor');

    const [progress, setProgress] = useState(0);
    const [indeterminate, setIndeterminate] = useState(true);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        const timer = setTimeout(() => {
            setIndeterminate(false);
            interval = setInterval(() => {
                setProgress((prev) => {
                    const targetProgress = todayCount / taskCount;
                    if (prev >= targetProgress) {
                        clearInterval(interval);
                        return targetProgress;
                    }
                    return Math.min(targetProgress, prev + 0.02);
                });
            }, 50);
        }, 500);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [id, taskCount, todayCount]);

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.card,
                { backgroundColor: cardBackground, borderColor: learningListCardBorderColor },
                isActive && {
                    backgroundColor: activeCardBackground,
                    borderColor: learningListCardPrimaryColor,
                    ...styles.cardActive,
                },
            ]}
        >
            <ThemedText style={[styles.name, isActive && { color: learningListCardActiveTextColor }]} numberOfLines={1}>
                {name}
            </ThemedText>

            <View style={styles.row}>
                <ThemedText style={styles.label}>Hôm nay</ThemedText>
                <ThemedText style={styles.value}>
                    {todayCount}/{taskCount}
                </ThemedText>
            </View>

            <Bar
                style={{ borderRadius: 30 }}
                color={learningListCardPrimaryColor}
                height={8}
                progress={progress}
                width={null}
                borderWidth={0}
                unfilledColor="#c6c6c666"
                indeterminate={indeterminate}
            />

            <ThemedText style={[styles.label, { marginTop: 6 }]}>Tiến độ (%)</ThemedText>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.center}>
                    <ThemedText style={styles.text}>
                        {Math.round(((masteredCardCount + 2) / (cardCount || 1)) * 100)}%
                    </ThemedText>
                </View>
                <Circle
                    progress={(masteredCardCount + 2) / (cardCount || 1)}
                    size={80}
                    color={learningListCardPrimaryColor}
                    indeterminate={indeterminate}
                />
            </View>
        </Pressable>
    );
}

export default function LearningList({
    selectedIndex,
    close,
}: {
    selectedIndex: number | undefined;
    close: () => void;
}) {
    const listRef = useRef<FlatList<Deck>>(null);
    const collections = useSelector((state: RootState) => state.learningList.collections);
    const [selectedId, setSelectedId] = useState<number>(selectedIndex || 0);
    const router = useRouter();
    const onSelect = (id: number, index: number) => {
        setSelectedId(id);
        listRef.current?.scrollToIndex({ index, viewPosition: 0.4 });
    };

    const handleLearnNow = () => {
        router.replace(`/quiz/${selectedId}`);
        close();
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={{ paddingHorizontal: 12 }}>
                Learning List
            </ThemedText>
            <View style={{ flex: 1, width: '100%' }}>
                <FlatList
                    ref={listRef}
                    data={collections}
                    keyExtractor={(item: any) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 12,
                        height: 200,
                        marginVertical: 24,
                    }}
                    nestedScrollEnabled={true}
                    getItemLayout={(_, index) => ({
                        length: ITEM_WIDTH,
                        offset: ITEM_WIDTH * index,
                        index,
                    })}
                    renderItem={({ item, index }) => {
                        return (
                            <DeckCard
                                id={item.collection.id}
                                name={item.collection.name}
                                todayCount={item.today_learned_count}
                                taskCount={item.task_count}
                                cardCount={item.collection.card_count}
                                masteredCardCount={item.mastered_card_count}
                                isActive={item?.collection?.id === selectedId}
                                onPress={() => onSelect(item.collection.id, index)}
                            />
                        );
                    }}
                />
            </View>

            <Button
                buttonStyle={{
                    marginHorizontal: 20,
                }}
                onPress={handleLearnNow}
            >
                Learn now
            </Button>
        </View>
    );
}

const ITEM_WIDTH = 220;

const styles = StyleSheet.create({
    container: { paddingVertical: 12 },
    card: {
        width: ITEM_WIDTH,
        marginRight: 12,
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
    },
    cardActive: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    name: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    label: { fontSize: 12, opacity: 0.7, marginBottom: 4 },
    value: { fontSize: 14, fontWeight: '600' },
    center: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
