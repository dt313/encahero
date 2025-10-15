import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

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
    const linkColor = useThemeColor({}, 'quizLinkTextColor');
    const linkBg = useThemeColor({}, 'quizLinkBg');
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    const shadowColor = useThemeColor({}, 'shadowColor');
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [confirmVisible, setConfirmVisible] = useState(false); // ✅ modal xác nhận
    const learningList = useSelector((state: RootState) => state.learningList.collections);
    const { showSuccessToast, showErrorToast } = useToast();

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
                setConfirmVisible(false);
                showSuccessToast('Bạn đã dừng học list này');
                // onClose();
            }
        } catch {
            showErrorToast('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    const handleRedirectToAllCards = () => {
        router.push(`/cards/${id}?type=all`);
        onClose();
    };

    const handleRedirectToKnownCards = () => {
        router.push(`/cards/${id}?type=mastered`);
        onClose();
    };

    if (!collection) {
        return <ThemedText>Collection không tồn tại hoặc chưa load xong</ThemedText>;
    }

    return (
        <View style={[styles.container]}>
            <ThemedText type="title" style={styles.title} numberOfLines={2}>
                {title}
            </ThemedText>

            <View style={styles.statsContainer}>
                <View style={[styles.statBox, { backgroundColor: white, shadowColor }]}>
                    <ThemedText style={styles.statNumber}>{10}</ThemedText>
                    <ThemedText lighter style={styles.statLabel}>
                        Đã học
                    </ThemedText>
                </View>
                <View style={[styles.statBox, { backgroundColor: white, shadowColor }]}>
                    <ThemedText style={styles.statNumber}>{collection?.mastered_card_count ?? 0}</ThemedText>
                    <ThemedText lighter style={styles.statLabel}>
                        Đã thuộc
                    </ThemedText>
                </View>
                <View style={[styles.statBox, { backgroundColor: white, shadowColor }]}>
                    <ThemedText style={styles.statNumber}>{collection?.collection?.card_count ?? 0}</ThemedText>
                    <ThemedText lighter style={styles.statLabel}>
                        Tổng số từ
                    </ThemedText>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={[styles.link, { backgroundColor: linkBg }]} onPress={handleRedirectToKnownCards}>
                    <Text style={[styles.linkText, { color: linkColor }]}>📖 Known Words</Text>
                    <HugeiconsIcon icon={ArrowRight02Icon} size={24} color={textColor} />
                </Pressable>

                <Pressable style={[styles.link, { backgroundColor: linkBg }]} onPress={handleRedirectToAllCards}>
                    <Text style={[styles.linkText, { color: linkColor }]}>📚 View All Words</Text>
                    <HugeiconsIcon icon={ArrowRight02Icon} size={24} color={textColor} />
                </Pressable>

                {collection?.status === 'in_progress' && (
                    <Pressable style={[styles.link, { backgroundColor: linkBg }]} onPress={handleOpenBottomModal}>
                        <Text style={[styles.linkText, { color: linkColor }]}>🔄 Chỉnh số lượng Task</Text>
                        <HugeiconsIcon icon={ArrowRight02Icon} size={24} color={textColor} />
                    </Pressable>
                )}
                {/* Stop Learning Button */}
                {collection.status === 'in_progress' ? (
                    <Pressable style={styles.stopButton} onPress={() => setConfirmVisible(true)}>
                        <Text style={styles.stopButtonText}>🛑 Stop Learning This List</Text>
                    </Pressable>
                ) : (
                    <ThemedText
                        style={{
                            textAlign: 'center',
                            fontStyle: 'italic',
                            fontSize: 16,
                            color: '#333',
                            marginVertical: 8,
                        }}
                    >
                        {collection.status === 'stopped' ? 'Bạn đã dừng bài này' : 'Bạn đã hoàn thành bài này'}
                    </ThemedText>
                )}
            </View>

            {/* Stop Confirm Modal */}

            <Modal
                visible={confirmVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setConfirmVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: white }]}>
                        <ThemedText style={styles.modalTitle}>Xác nhận dừng học</ThemedText>
                        <ThemedText style={styles.modalMessage}>Bạn có chắc muốn dừng học list này không?</ThemedText>

                        <View style={styles.modalActions}>
                            <Pressable
                                style={[styles.modalButton, { backgroundColor: '#f87171' }]}
                                onPress={handleStopLearning}
                            >
                                <Text style={styles.modalButtonText}>Dừng học</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, { backgroundColor: '#e5e7eb' }]}
                                onPress={() => setConfirmVisible(false)}
                            >
                                <Text style={[styles.modalButtonText, { color: '#111' }]}>Hủy</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal Bottom Sheet */}
            <ModalBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                <ListRegister
                    description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                    title={title ?? ''}
                    onClose={handleCloseBottomModal}
                    onConfirm={handleConfirm}
                    isRegistered={true}
                    goal={collection?.task_count || 0}
                    id={id}
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

        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 1,

        // Shadow cho Android
        elevation: 1.5,
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

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        borderRadius: 16,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: 'row',
        columnGap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
