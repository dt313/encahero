import React, { useCallback, useRef } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import ListRegister from './list-register';
import ModalBottomSheet from './modal-bottom-sheet';

type RegisteredStatsProps = {
    title: string;
};

export default function RegisteredListStats({ title }: RegisteredStatsProps) {
    const background = useThemeColor({}, 'background');
    const linkColor = useThemeColor({}, 'quizLinkTextColor');
    const linkBg = useThemeColor({}, 'quizLinkBg');
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handleOpenBottomModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleConfirm = () => {};
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <ThemedText type="title" style={styles.title} numberOfLines={2}>
                {title}
            </ThemedText>

            <View style={styles.statsContainer}>
                <View style={[styles.statBox, { backgroundColor: white }]}>
                    <ThemedText style={styles.statNumber}>{10}</ThemedText>
                    <ThemedText lighter style={styles.statLabel}>
                        Đã học
                    </ThemedText>
                </View>
                <View style={[styles.statBox, { backgroundColor: white }]}>
                    <ThemedText style={styles.statNumber}>{20}</ThemedText>
                    <ThemedText lighter style={styles.statLabel}>
                        Đã thuộc
                    </ThemedText>
                </View>
                <View style={[styles.statBox, { backgroundColor: white }]}>
                    <ThemedText style={styles.statNumber}>{200}</ThemedText>
                    <ThemedText lighter style={styles.statLabel}>
                        Tổng số từ
                    </ThemedText>
                </View>
            </View>

            <View style={styles.buttonContainer}>
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

                <Pressable style={[styles.link, { backgroundColor: linkBg }]} onPress={handleOpenBottomModal}>
                    <Text style={[styles.linkText, { color: linkColor }]}>🔄 Chỉnh số lượng Task</Text>
                    <HugeiconsIcon icon={ArrowRight02Icon} size={24} color={textColor} />
                </Pressable>
                {/* Stop Learning Button */}
                <Pressable style={styles.stopButton}>
                    <Text style={styles.stopButtonText}>🛑 Stop Learning This List</Text>
                </Pressable>
            </View>

            {/* Modal Bottom Sheet */}
            <ModalBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                <ListRegister
                    description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                    title={'Hello'}
                    onConfirm={handleConfirm}
                    isRegistered={true}
                />
            </ModalBottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        rowGap: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        columnGap: 12,
    },
    statBox: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        // Shadow cho iOS
        shadowColor: '#9e9e9eff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow cho Android
        elevation: 5,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FF9800',
    },
    statLabel: {
        fontSize: 14,
        marginTop: 4,
    },
    buttonContainer: {
        width: '100%',
        rowGap: 12,
    },

    link: {
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    linkText: {
        fontSize: 16,
        fontWeight: '600',
    },

    stopButton: {
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
