import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

type CardStatsProps = {
    status: 'mastered' | 'learning' | 'unknown' | string;
    rating?: string | null;
    learned_count?: number | null;
};

const CardStats = ({ status, rating, learned_count }: CardStatsProps) => {
    const statusColor = status === 'mastered' ? 'green' : status === 'active' ? 'orange' : 'red';

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <ThemedText style={styles.label}>Status</ThemedText>
                <ThemedText style={[styles.value, { color: statusColor }]}>{status}</ThemedText>
            </View>

            <View style={styles.item}>
                <ThemedText style={styles.label}>Rating</ThemedText>
                <ThemedText style={styles.value}>{rating || 'N/A'}</ThemedText>
            </View>

            <View style={styles.item}>
                <ThemedText style={styles.label}>Learned count</ThemedText>
                <ThemedText style={styles.value}>{learned_count ?? 0}</ThemedText>
            </View>
        </View>
    );
};

export default CardStats;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
    },
    item: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
    },
});
