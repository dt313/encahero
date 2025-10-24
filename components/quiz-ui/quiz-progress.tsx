import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Bar } from 'react-native-progress';

import { ThemedText } from '../ThemedText';

type Props = { learned: number; total: number };

export default function QuizProgress({ learned, total }: Props) {
    const progress = learned / total;
    return (
        <View style={styles.progress}>
            <ThemedText style={styles.progressNumber}>{learned}</ThemedText>
            <Bar
                style={{ flex: 1, marginHorizontal: 12, borderRadius: 30 }}
                color={progress > 1 ? '#2196f3' : '#4caf50'}
                height={12}
                progress={progress}
                width={null}
                borderWidth={0}
                unfilledColor="rgba(198,198,198,0.4)"
            />
            <ThemedText style={styles.progressNumber}>{total}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    progress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 24,
        paddingHorizontal: 12,
    },
    progressNumber: { fontWeight: '500', fontSize: 18 },
});
