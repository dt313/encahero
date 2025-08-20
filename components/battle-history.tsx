import React from 'react';

import { FlatList, Image, Platform, StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

const mockRanking = {
    rank: 5,
    username: 'TuanDanh',
    score: 1200,
    avatar: 'https://i.pravatar.cc/100?img=5',
};

const mockHistory = [
    { id: '1', opponent: 'Alice', result: 'Win', date: '2025-08-10', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '2', opponent: 'Bob', result: 'Lose', date: '2025-08-09', avatar: 'https://i.pravatar.cc/100?img=2' },
    { id: '3', opponent: 'Charlie', result: 'Win', date: '2025-08-08', avatar: 'https://i.pravatar.cc/100?img=3' },
    { id: '4', opponent: 'Alice', result: 'Win', date: '2025-08-10', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '5', opponent: 'Bob', result: 'Lose', date: '2025-08-09', avatar: 'https://i.pravatar.cc/100?img=2' },
    { id: '6', opponent: 'Charlie', result: 'Win', date: '2025-08-08', avatar: 'https://i.pravatar.cc/100?img=3' },
    { id: '7', opponent: 'Alice', result: 'Win', date: '2025-08-10', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '8', opponent: 'Bob', result: 'Lose', date: '2025-08-09', avatar: 'https://i.pravatar.cc/100?img=2' },
    { id: '9', opponent: 'Charlie', result: 'Win', date: '2025-08-08', avatar: 'https://i.pravatar.cc/100?img=3' },
    { id: '10', opponent: 'Alice', result: 'Win', date: '2025-08-10', avatar: 'https://i.pravatar.cc/100?img=1' },
    { id: '11', opponent: 'Bob', result: 'Lose', date: '2025-08-09', avatar: 'https://i.pravatar.cc/100?img=2' },
    { id: '12', opponent: 'Charlie', result: 'Win', date: '2025-08-08', avatar: 'https://i.pravatar.cc/100?img=3' },
];

export default function BattleHistory() {
    const backgroundColor = useThemeColor({}, 'background');
    return (
        <View style={styles.container}>
            {/* My Ranking */}
            <View style={styles.myRanking}>
                <Image source={{ uri: mockRanking.avatar }} style={styles.avatar} />
                <View style={styles.rankingInfo}>
                    <ThemedText style={styles.title}>{mockRanking.username}</ThemedText>
                    <ThemedText style={styles.subText}>Rank: {mockRanking.rank}</ThemedText>
                    <ThemedText style={styles.subText}>Score: {mockRanking.score}</ThemedText>
                </View>
            </View>

            {/* Battle History */}
            <View style={styles.history}>
                <ThemedText style={styles.historyTitle}>Battle History</ThemedText>
                <FlatList
                    data={mockHistory}
                    contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 40 : 20 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.historyItem, { backgroundColor }]}>
                            <Image source={{ uri: item.avatar }} style={styles.historyAvatar} />
                            <View style={styles.historyText}>
                                <ThemedText style={styles.opponent}>{item.opponent}</ThemedText>
                                <ThemedText style={styles.date}>{item.date}</ThemedText>
                            </View>
                            <Text style={item.result === 'Win' ? styles.win : styles.lose}>{item.result}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 16,
    },
    myRanking: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#c1cae9ff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    rankingInfo: {
        flex: 1,
    },
    title: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subText: {
        color: '#525252ff',
        fontSize: 14,
        fontWeight: 500,
    },
    history: {
        flex: 1,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    historyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    historyText: {
        flex: 1,
    },
    opponent: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    date: {
        color: '#999',
        fontSize: 12,
        marginTop: 2,
    },
    win: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16,
    },
    lose: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
