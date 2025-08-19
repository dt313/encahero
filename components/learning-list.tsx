import React, { useEffect, useMemo, useRef, useState } from 'react';

import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Bar, Circle } from 'react-native-progress';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

type Deck = {
    id: string;
    name: string;
    current: number; // số thẻ đã học (hiện tại)
    target: number; // mục tiêu trong ngày
    total: number; // tổng số thẻ của bộ
};

const SAMPLE_DATA: Deck[] = [
    { id: '1', name: 'English A1', current: 12, target: 20, total: 150 },
    { id: '2', name: 'TOEIC Vocab', current: 35, target: 50, total: 800 },
    { id: '3', name: 'Korean Basic', current: 5, target: 15, total: 200 },
    { id: '4', name: 'Algorithms', current: 18, target: 30, total: 420 },
    { id: '5', name: 'React Native', current: 9, target: 25, total: 120 },
];

export default function LearningList() {
    const [selectedId, setSelectedId] = useState<string>(SAMPLE_DATA[0].id);
    const listRef = useRef<FlatList<Deck>>(null);
    const data = useMemo(() => SAMPLE_DATA, []);

    const cardBackground = useThemeColor({}, 'learningListCardBg');
    const activeCardBackground = useThemeColor({}, 'learningListCardActiveBg');
    const learningListCardActiveTextColor = useThemeColor({}, 'learningListCardActiveTextColor');
    const learningListCardBorderColor = useThemeColor({}, 'learningListCardBorderColor');
    const learningListCardPrimaryColor = useThemeColor({}, 'learningListCardPrimaryColor');

    const onSelect = (id: string, index: number) => {
        setSelectedId(id);
        listRef.current?.scrollToIndex({ index, viewPosition: 0.3 });
    };
    const [progress, setProgress] = React.useState(0);
    const [indeterminate, setIndeterminate] = React.useState(true);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        const timer = setTimeout(() => {
            setIndeterminate(false);
            interval = setInterval(() => {
                setProgress((prevProgress) => Math.min(1, prevProgress + Math.random() / 5));
            }, 500);
        }, 1500);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={{ paddingHorizontal: 12 }}>
                Learning List
            </ThemedText>

            <FlatList
                ref={listRef}
                data={data}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 12, height: 200, marginVertical: 24 }}
                getItemLayout={(_, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_WIDTH * index,
                    index,
                })}
                renderItem={({ item, index }) => {
                    const isActive = item.id === selectedId;
                    return (
                        <Pressable
                            onPress={() => onSelect(item.id, index)}
                            style={[
                                styles.card,
                                { backgroundColor: cardBackground, borderColor: learningListCardBorderColor },

                                isActive && [
                                    styles.cardActive,
                                    {
                                        backgroundColor: activeCardBackground,
                                        borderColor: learningListCardPrimaryColor,
                                    },
                                ],
                            ]}
                        >
                            <ThemedText
                                style={[styles.name, isActive && { color: learningListCardActiveTextColor }]}
                                numberOfLines={1}
                            >
                                {item.name}
                            </ThemedText>

                            {/* current / target */}
                            <View style={styles.row}>
                                <ThemedText style={styles.label}>Hôm nay</ThemedText>
                                <ThemedText style={styles.value}>
                                    {item.current}/{item.target}
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
                            <ThemedText style={[styles.label, { marginTop: 6, marginBottom: 0 }]}>
                                Tiến độ (%)
                            </ThemedText>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <View style={styles.center}>
                                    <ThemedText style={styles.text}>{Math.round(progress * 100)}%</ThemedText>
                                </View>
                                <Circle
                                    progress={progress}
                                    size={80}
                                    color={learningListCardPrimaryColor}
                                    indeterminate={indeterminate}
                                />
                            </View>
                        </Pressable>
                    );
                }}
            />

            <Button
                buttonStyle={{
                    marginHorizontal: 20,
                }}
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
