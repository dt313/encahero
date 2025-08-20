import React, { useState } from 'react';

import { Alert, Pressable, SectionList, StyleSheet, Switch, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';

const SETTINGS_DATA = [
    {
        title: 'Tài khoản',
        data: [{ key: 'profile', label: 'Thông tin cá nhân' }],
    },
    {
        title: 'Học & Flashcard',
        data: [{ key: 'mode', label: 'Chế độ học: Normal' }],
    },
    {
        title: 'Thông báo',
        data: [
            { key: 'dailyReminder', label: 'Nhắc nhở học hàng ngày' },
            { key: 'progressNotify', label: 'Thông báo tiến độ', type: 'switch' },
        ],
    },
    {
        title: 'Giao diện',
        data: [{ key: 'darkMode', label: 'Chế độ tối', type: 'switch' }],
    },
    {
        title: 'Hỗ trợ',
        data: [
            { key: 'help', label: 'Hướng dẫn sử dụng' },
            { key: 'feedback', label: 'Gửi phản hồi' },
        ],
    },
    {
        title: 'System',
        data: [{ key: 'logout', label: 'Đăng xuất' }],
    },
];

export default function SettingsScreen() {
    const [switchState, setSwitchState] = useState({
        showFront: true,
        showBack: true,
        dailyReminder: false,
        progressNotify: true,
        darkMode: false,
    });

    const backgroundColor = useThemeColor({}, 'background');

    const handleToggle = (key: any) => {
        setSwitchState((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePress = (item: any) => {
        if (item.key === 'logout') {
            Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất không?');
        } else {
            Alert.alert(item.label);
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        if (item.type === 'switch') {
            return (
                <View style={[styles.item, { backgroundColor }]}>
                    <ThemedText style={styles.label}>{item.label}</ThemedText>
                    <Switch value={switchState[item.key]} onValueChange={() => handleToggle(item.key)} />
                </View>
            );
        } else {
            return (
                <Pressable style={[styles.item, { backgroundColor }]} onPress={() => handlePress(item)}>
                    <ThemedText style={styles.label}>{item.label}</ThemedText>
                </Pressable>
            );
        }
    };

    const renderSectionHeader = ({ section: { title } }) => (
        <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
    );

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={SETTINGS_DATA}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        fontSize: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
    },
    label: {
        fontSize: 15,
    },
    separator: {
        height: 1,
        marginVertical: 2,
        backgroundColor: 'transparent',
    },
});
