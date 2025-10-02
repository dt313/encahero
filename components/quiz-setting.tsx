import React, { useState } from 'react';

import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { changeStatus } from '@/store/action/learning-list-action';
import { toggleAutoPlay } from '@/store/action/sound-action';
import { RootState } from '@/store/reducers';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { collectionService } from '@/services';

import { ThemedText } from './ThemedText';
import Button from './button';

function QuizSetting({
    collectionId,
    onClose,
    onToggle,
    reviewMode,
    isShowReviewMode,
}: {
    collectionId: number | undefined;
    onClose: () => void;
    onToggle: () => void;
    reviewMode: boolean;
    isShowReviewMode?: boolean;
}) {
    const isAutoSound = useSelector((state: RootState) => state.sound.autoSound);
    const router = useRouter();

    const [autoPlay, setAutoPlay] = useState(isAutoSound);

    const linkColor = useThemeColor({}, 'quizLinkTextColor');
    const linkBg = useThemeColor({}, 'quizLinkBg');
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');

    const dispatch = useDispatch();
    const { showSuccessToast, showErrorToast } = useToast();
    const handleStopLearning = async () => {
        if (!collectionId) return;
        try {
            const res = await collectionService.changeStatusOfCollection(collectionId, 'stopped');
            if (res) {
                dispatch(changeStatus({ id: collectionId, status: 'stopped' }));
                showSuccessToast('Bạn đã dừng học list này');
                onClose();
                router.replace('/');
            }
        } catch {
            showErrorToast('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    const toggleAutoPlaySound = (value: boolean) => {
        setAutoPlay(value);
        dispatch(toggleAutoPlay());
    };

    const redirectToAllWords = () => {
        router.push(`/cards/${collectionId}`);
        onClose();
    };

    const redirectToKnownWords = () => {
        router.push(`/cards/${collectionId}?type=mastered`);
        onClose();
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.header}>
                Quiz Settings
            </ThemedText>

            {/* Review Mode */}
            {isShowReviewMode && (
                <View style={[styles.optionRow, { backgroundColor: white }]}>
                    <ThemedText style={styles.optionText}>Review Mode</ThemedText>
                    <Switch
                        value={reviewMode}
                        onValueChange={onToggle}
                        // thumbColor={reviewMode ? '#4caf50' : '#f4f4f4'}
                    />
                </View>
            )}

            {/* Auto Play Sound */}
            <View style={[styles.optionRow, { backgroundColor: white }]}>
                <ThemedText style={styles.optionText}>Auto Play Sound</ThemedText>
                <Switch value={autoPlay} onValueChange={toggleAutoPlaySound} />
            </View>

            {/* Links */}
            <Pressable style={[styles.link, { backgroundColor: linkBg }]} onPress={redirectToKnownWords}>
                <Text style={[styles.linkText, { color: linkColor }]}>📖 Known Words</Text>
                <HugeiconsIcon icon={ArrowRight02Icon} size={24} color={textColor} />
            </Pressable>

            <Pressable style={[styles.link, { backgroundColor: linkBg }]} onPress={redirectToAllWords}>
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
