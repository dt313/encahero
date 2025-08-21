import React, { useState } from 'react';

import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

function QuizSetting() {
    const [reviewMode, setReviewMode] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);

    const linkColor = useThemeColor({}, 'quizLinkTextColor');
    const linkBg = useThemeColor({}, 'quizLinkBg');
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');

    const handleStopLearning = () => {
        Alert.alert('Stop Learning', 'Are you sure you want to stop learning this list?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => console.log('Stopped learning') },
        ]);
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.header}>
                Quiz Settings
            </ThemedText>

            {/* Review Mode */}
            <View style={[styles.optionRow, { backgroundColor: white }]}>
                <ThemedText style={styles.optionText}>Review Mode</ThemedText>
                <Switch
                    value={reviewMode}
                    onValueChange={setReviewMode}
                    // thumbColor={reviewMode ? '#4caf50' : '#f4f4f4'}
                />
            </View>

            {/* Auto Play Sound */}
            <View style={[styles.optionRow, { backgroundColor: white }]}>
                <ThemedText style={styles.optionText}>Auto Play Sound</ThemedText>
                <Switch value={autoPlay} onValueChange={setAutoPlay} />
            </View>

            {/* Links */}
            <Pressable
                style={[styles.link, { backgroundColor: linkBg }]}
                onPress={() => console.log('Go to Known Words')}
            >
                <Text style={[styles.linkText, { color: linkColor }]}>📖 Known Words</Text>
                <HugeiconsIcon icon={ArrowRight02Icon} size={24} color={textColor} />
            </Pressable>

            <Pressable
                style={[styles.link, { backgroundColor: linkBg }]}
                onPress={() => console.log('Go to All Words')}
            >
                <Text style={[styles.linkText, { color: linkColor }]}>📚 View All Words</Text>
                <HugeiconsIcon icon={ArrowRight02Icon} size={24} color={textColor} />
            </Pressable>

            {/* Stop Learning Button */}

            <Button type="dangerous" onPress={handleStopLearning}>
                🛑 Stop Learning This List
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginBottom: 12,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    optionText: {
        fontSize: 16,
    },
    link: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    linkText: {
        fontSize: 16,
        fontWeight: '600',
    },
    stopButton: {
        marginTop: 20,
        backgroundColor: '#fee2e2',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    stopButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#dc2626',
    },
});

export default QuizSetting;
