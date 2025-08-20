import React, { useState } from 'react';

import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';

import { useRouter } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcon from '@/components/back-icon';

// bạn đã có BackIcon trong project

type WordItem = {
    title: string;
    data: string[];
};

// fake data
const DATA: WordItem[] = [
    { title: 'A', data: ['Apple', 'Animal', 'Ant', 'Airport', 'Answer'] },
    { title: 'B', data: ['Book', 'Business', 'Bottle', 'Bank', 'Bridge'] },
    { title: 'C', data: ['Car', 'Computer', 'Camera', 'City', 'Coffee'] },
    { title: 'D', data: ['Door', 'Dream', 'Doctor', 'Dance', 'Dinner'] },
    { title: 'E', data: ['Email', 'Energy', 'Earth', 'Engine', 'Event'] },
    { title: 'F', data: ['Food', 'Friend', 'Family', 'Future', 'Forest'] },
    { title: 'G', data: ['Game', 'Garden', 'Gift', 'Group', 'Growth'] },
    { title: 'H', data: ['House', 'Hotel', 'History', 'Health', 'Holiday'] },
    { title: 'I', data: ['Idea', 'Internet', 'Island', 'Issue', 'Image'] },
    { title: 'J', data: ['Job', 'Journey', 'Juice', 'Judge', 'Joy'] },
];

function Collection() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    // TODO:  use debounce here
    const filteredData = DATA.map((section) => ({
        ...section,
        data: section.data.filter((word) => word.toLowerCase().includes(search.toLowerCase())),
    })).filter((section) => section.data.length > 0);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <BackIcon onPress={() => router.back()} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search words..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Body */}
            <SectionList
                sections={filteredData}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.word}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
            />
        </SafeAreaView>
    );
}

export default Collection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold',
        fontSize: 16,
    },
    item: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    word: {
        fontSize: 16,
    },
});
