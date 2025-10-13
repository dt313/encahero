import React, { useEffect, useState } from 'react';

import { ActivityIndicator, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import BattleRequestModal from './battle-request-modal';
import Button from './button';

export type User = {
    id: string;
    name: string;
    avatar: string;
    win: number;
    total: number;
};
const users: User[] = [
    { id: '1', name: 'Alice', avatar: 'https://i.pravatar.cc/100?img=1', win: 8, total: 10 },
    { id: '2', name: 'Bob', avatar: 'https://i.pravatar.cc/100?img=2', win: 5, total: 12 },
    { id: '3', name: 'Charlie', avatar: 'https://i.pravatar.cc/100?img=3', win: 3, total: 9 },
    { id: '4', name: 'David', avatar: 'https://i.pravatar.cc/100?img=4', win: 7, total: 11 },
    { id: '5', name: 'Eve', avatar: 'https://i.pravatar.cc/100?img=5', win: 10, total: 14 },
    { id: '6', name: 'Frank', avatar: 'https://i.pravatar.cc/100?img=6', win: 2, total: 8 },
    { id: '7', name: 'Grace', avatar: 'https://i.pravatar.cc/100?img=7', win: 9, total: 15 },
    { id: '8', name: 'Hannah', avatar: 'https://i.pravatar.cc/100?img=8', win: 4, total: 10 },
    { id: '9', name: 'Ivy', avatar: 'https://i.pravatar.cc/100?img=9', win: 6, total: 9 },
    { id: '10', name: 'Jack', avatar: 'https://i.pravatar.cc/100?img=10', win: 11, total: 13 },
    { id: '11', name: 'Kevin', avatar: 'https://i.pravatar.cc/100?img=11', win: 1, total: 5 },
    { id: '12', name: 'Lucy', avatar: 'https://i.pravatar.cc/100?img=12', win: 12, total: 16 },
];

function BattleUserList() {
    const [random, setRandom] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const backgroundColor = useThemeColor({}, 'background');
    const white = useThemeColor({}, 'white');
    const router = useRouter();
    const handleRandom = () => {
        setRandom(true);
    };

    useEffect(() => {
        let timeout = null;
        if (random) {
            timeout = setTimeout(() => {
                setRandom(false);
                router.push('/lobby/1');
            }, 2000);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [random]);

    const handleSpecificUserBattle = (user: User) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const renderItem = ({ item }: { item: User }) => (
        <View style={styles.userWrap}>
            <View style={styles.userCard}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />

                <View style={styles.info}>
                    <ThemedText style={styles.userName}>{item.name}</ThemedText>
                    <ThemedText style={styles.stats}>
                        {item.win} thắng / {item.total} trận
                    </ThemedText>
                </View>

                <TouchableOpacity style={styles.battleButton} onPress={() => handleSpecificUserBattle(item)}>
                    <Text>⚔️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.randomBox, { backgroundColor: white }]}>
                {random ? (
                    // Đang tìm đối thủ
                    <View style={{ alignItems: 'center', gap: 12 }}>
                        <ActivityIndicator size="large" color="#4facfe" />
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>Đang tìm đối thủ...</Text>
                        <Button
                            buttonStyle={{
                                backgroundColor: '#ff4e50',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 12,
                            }}
                            // onPress={handleCancelQueue}
                        >
                            Huỷ tìm trận
                        </Button>
                    </View>
                ) : (
                    // Chưa tìm → hiển thị nút random
                    <Button
                        buttonStyle={{
                            backgroundColor: '#4facfe',
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            borderRadius: 12,
                        }}
                        onPress={handleRandom}
                    >
                        Quay ngẫu nhiên 🎲
                    </Button>
                )}
            </View>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? 120 : 60,
                    paddingTop: 12,
                    backgroundColor: backgroundColor,
                    borderRadius: 12,
                }}
            />

            <BattleRequestModal
                visible={modalVisible}
                user={selectedUser}
                mode="receiver"
                onClose={() => {
                    setModalVisible(false);
                    setSelectedUser(null);
                }}
            />
        </View>
    );
}

export default BattleUserList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    randomBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 24,
        marginHorizontal: 16,
        marginVertical: 16,
        marginTop: 16,
        height: 160,
        backgroundColor: '#ffffffff', // màu nền nhẹ nhàng
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1, // shadow cho Android
    },

    dice: {
        width: 80,
        height: 80,
    },
    userWrap: {
        paddingHorizontal: 20,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,

        borderBottomWidth: 1.5,
        borderColor: '#b2b2b2ff',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
        borderWidth: 1.5,
        borderColor: '#b2b2b2ff',
    },
    info: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
    },
    stats: {
        fontSize: 14,
        color: '#666',
    },
    battleButton: {
        backgroundColor: '#4facfe',
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#aeaeaeff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1, // shadow cho Android
    },
});
