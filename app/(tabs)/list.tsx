import React from 'react';

import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryList from '@/components/category-list';
import HorizontalList from '@/components/horizontal-list';
import ListHeader from '@/components/list-header';

export type ItemType = {
    name: string;
    cards: number;
    icon: string;
    isRegistered?: boolean;
    isLearningList?: boolean;
};

const data: ItemType[] = [
    {
        name: 'Common Words Common Words Common Words Common Words Common Words Common Words  Common Words Common Words',
        cards: 639,
        icon: '👨‍🎓',
        isRegistered: true,
    },
    {
        name: 'Business English',
        cards: 420,
        icon: '💼',
    },
    {
        name: 'Travel & Tourism',
        cards: 310,
        icon: '✈️',
    },
    {
        name: 'TOEIC Practice',
        cards: 550,
        icon: '📚',
        isRegistered: true,
    },
    {
        name: 'Daily Conversations',
        cards: 275,
        icon: '🗣️',
    },
];

const data2: ItemType[] = [
    {
        name: 'Common Words',
        cards: 639,
        icon: '👨‍🎓',
        isRegistered: true,
        isLearningList: true,
    },
    {
        name: 'Business English',
        cards: 420,
        icon: '💼',
        isRegistered: true,
        isLearningList: true,
    },
    {
        name: 'Travel & Tourism',
        cards: 310,
        icon: '✈️',
        isRegistered: true,
        isLearningList: true,
    },
    {
        name: 'TOEIC Practice',
        cards: 550,
        icon: '📚',
        isRegistered: true,
        isLearningList: true,
    },
    {
        name: 'Daily Conversations',
        cards: 275,
        icon: '🗣️',
        isRegistered: true,
        isLearningList: true,
    },
];

function List() {
    return (
        <SafeAreaView style={[styles.wrapper]}>
            <ListHeader />
            <View>
                <ScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 80 }}>
                    <View
                        style={{
                            paddingHorizontal: 20,
                        }}
                    >
                        <HorizontalList isRandomColor containerStyle={{ marginTop: 24 }} list={data} />
                        <HorizontalList headerName="Learning List" containerStyle={{ marginTop: 24 }} list={data2} />
                        <CategoryList />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

export default List;
