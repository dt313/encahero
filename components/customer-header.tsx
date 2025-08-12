import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

// hoặc icon bạn thích

export default function CustomHeader({ title }: { title: string }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={{ fontSize: 18 }}>{'←'}</Text>
                {/* Bạn có thể thay bằng icon */}
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={{ width: 40 }} /> {/* placeholder cho căn giữa */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 40,
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
