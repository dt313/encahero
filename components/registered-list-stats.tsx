import React, { useCallback, useMemo, useRef } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { changeStatus, updateTaskCount } from '@/store/action/learning-list-action';
import { RootState } from '@/store/reducers';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { collectionService } from '@/services';

import { ThemedText } from './ThemedText';
import ListRegister from './list-register';
import ModalBottomSheet from './modal-bottom-sheet';

type RegisteredStatsProps = {
    id: number;
    title: string;
    onClose: () => void;
};

export default function RegisteredListStats({ id, title, onClose }: RegisteredStatsProps) {
    const background = useThemeColor({}, 'background');
    const linkColor = useThemeColor({}, 'quizLinkTextColor');
    const linkBg = useThemeColor({}, 'quizLinkBg');
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');

    const learningList = useSelector((state: RootState) => state.learningList.collections);
    const { showSuccessToast, showErrorToast } = useToast();
    const dispatch = useDispatch();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const collection = useMemo(() => {
        if (!learningList || learningList.length === 0) return undefined;
        return learningList.find((item: CollectionProgress) => item.collection_id === id);
    }, [learningList, id]);

    const handleOpenBottomModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleCloseBottomModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handleConfirm = async (goal: number) => {
        const res = await collectionService.changeTask(id, goal);
        if (res) {
            showSuccessToast('Cập nhật số lượng task thành công');
            dispatch(updateTaskCount({ id: res.collectionId, task_count: res.task_count }));
            handleCloseBottomModal();
        }
    };

    const handleStopLearning = async () => {
        if (!collection) return;
        try {
            const res = await collectionService.changeStatusOfCollection(collection.collection_id, 'stopped');
            if (res) {
                dispatch(changeStatus({ id: collection.collection_id, status: 'stopped' }));
                showSuccessToast('Bạn đã dừng học list này');
                onClose();
            }
        } catch {
            showErrorToast('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    if (!collection) {
        return <ThemedText>Collection không tồn tại hoặc chưa load xong</ThemedText>;
    }

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
                    <ThemedText style={styles.statNumber}>{collection?.mastered_card_count ?? 0}</ThemedText>
                    <ThemedText lighter style={styles.statLabel}>
                        Đã thuộc
                    </ThemedText>
                </View>
                <View style={[styles.statBox, { backgroundColor: white }]}>
                    <ThemedText style={styles.statNumber}>{collection?.collection?.card_count ?? 0}</ThemedText>
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
                {collection.status === 'stopped' ? (
                    <ThemedText
                        style={{
                            textAlign: 'center',
                            fontStyle: 'italic',
                            fontSize: 16,
                            color: '#333',
                            marginVertical: 8,
                        }}
                    >
                        Bạn đã dừng bài này
                    </ThemedText>
                ) : (
                    <Pressable style={styles.stopButton} onPress={handleStopLearning}>
                        <Text style={styles.stopButtonText}>🛑 Stop Learning This List</Text>
                    </Pressable>
                )}
            </View>

            {/* Modal Bottom Sheet */}
            <ModalBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                <ListRegister
                    description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                    title={title ?? ''}
                    onClose={handleCloseBottomModal}
                    onConfirm={handleConfirm}
                    isRegistered={true}
                    goal={collection?.task_count || 0}
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
