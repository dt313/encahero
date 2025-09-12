import React from 'react';

import { FlatList, Image, ImageBackground, StyleSheet, View } from 'react-native';

import confetti from '@/assets/images/confetti.png';
import avatar from '@/assets/images/peeps-avatar-alpha.png';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

const data = [
    {
        id: '1',
        name: 'Kameron Porter',
        percent: 100,
        rank: 1,
        avatar: avatar,
    },
    {
        id: '2',
        name: 'Michael Kopfler',
        percent: 75,
        rank: 2,
        avatar: avatar,
    },
    {
        id: '3',
        name: 'Alice Koller',
        percent: 73,
        rank: 3,
        avatar: avatar,
    },
    {
        id: '4',
        name: 'Peter Dinklage',
        percent: 69,
        rank: 4,
        avatar: avatar,
    },
    {
        id: '5',
        name: 'George Limbo',
        percent: 76,
        rank: 5,
        avatar: avatar,
    },
    {
        id: '6',
        name: 'Julia Berger',
        percent: 68,
        rank: 6,
        avatar: avatar,
    },
    {
        id: '7',
        name: 'Dave Jhonson',
        percent: 85,
        rank: 7,
        avatar: avatar,
    },

    {
        id: '8',
        name: 'George Limbo',
        percent: 76,
        rank: 5,
        avatar: avatar,
    },
    {
        id: '9',
        name: 'Julia Berger',
        percent: 68,
        rank: 6,
        avatar: avatar,
    },
    {
        id: '10',
        name: 'Dave Jhonson',
        percent: 85,
        rank: 7,
        avatar: avatar,
    },
];

function LeaderboardItem({ item }: { item: any }) {
    const backgroundColor = useThemeColor({}, 'background');
    return (
        <View
            style={[
                styles.item,
                { backgroundColor },
                item.rank === 2 && styles.firstItem,
                item.rank === 3 && styles.secondItem,
            ]}
        >
            <Image source={avatar} style={styles.avatar} />
            <View style={styles.info}>
                <ThemedText
                    style={[styles.name, item.rank === 2 && styles.firstName, item.rank === 3 && styles.secondName]}
                >
                    {item.name}
                </ThemedText>
                <ThemedText style={[item.rank === 2 && styles.firstMatch, item.rank === 3 && styles.secondMatch]}>
                    {item.percent}% completed
                </ThemedText>
            </View>
            <View
                style={[
                    styles.rankCircle,
                    item.rank === 2 && styles.rankCircleFirst,
                    item.rank === 3 && styles.rankCircleSecond,
                ]}
            >
                <ThemedText style={[styles.rankText]}>{item.rank}</ThemedText>
            </View>
        </View>
    );
}

export default function Leaderboard() {
    return (
        <View style={styles.container}>
            <ImageBackground source={confetti} style={{ paddingVertical: 20 }}>
                {/* <ThemedText type="title" style={[styles.title]}>
                    Leaderboard 🏆
                </ThemedText> */}
                {/* Người đứng đầu */}

                <View style={styles.top}>
                    <View style={styles.avatarWrapper}>
                        <Image source={avatar} style={styles.topAvatar} />
                        <ThemedText style={styles.crown}>👑</ThemedText>
                    </View>
                    <ThemedText style={styles.topName}>{data[0].name}</ThemedText>
                    <ThemedText>{data[0].percent}% completed</ThemedText>
                </View>
            </ImageBackground>

            {/* Danh sách */}
            <FlatList
                data={data.slice(1)} // bỏ người đầu
                renderItem={({ item }) => <LeaderboardItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    padding: 16,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { fontWeight: 400, textAlign: 'center', marginBottom: 20 },
    top: { alignItems: 'center', marginBottom: 20 },

    avatarWrapper: {
        position: 'relative', // Quan trọng để crown dựa vào
        justifyContent: 'center',
        alignItems: 'center',
    },
    topAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
        borderWidth: 1.5,
        borderColor: '#9e919133',
        backgroundColor: '#00a4c592',
    },
    crown: {
        fontSize: 32,
        position: 'absolute',
        top: -5,
        left: 10,
        transform: [
            {
                rotate: '-30deg',
            },
        ],
    },
    topName: { fontSize: 18, fontWeight: 'bold' },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
        borderRadius: 12,
        // Shadow cho iOS
        shadowColor: '#9e9e9eff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow cho Android
        elevation: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        borderWidth: 1.5,
        borderColor: '#aa9c9c33',
        backgroundColor: '#a1d7e292',
    },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: '600' },

    rankCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#8d8d8dff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: { fontWeight: 'bold' },

    // first item
    firstItem: { backgroundColor: '#dfb0e3ff' },
    rankCircleFirst: { backgroundColor: '#e67eefff' },
    firstName: { fontSize: 20, color: '#333' },
    firstMatch: { color: '#333' },

    // second item

    secondItem: { backgroundColor: '#c1e891ff' },
    rankCircleSecond: { backgroundColor: '#6bb413ff' },
    secondName: { fontSize: 18, color: '#333' },
    secondMatch: { color: '#333' },
});
