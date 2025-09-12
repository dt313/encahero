import React, { useEffect, useState } from 'react';

import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { User } from './battle-user-list';

type BattleRequestModalProps = {
    visible: boolean;
    user: User | null;
    onClose: () => void;
    mode?: 'sender' | 'receiver'; // sender = bạn gửi, receiver = bạn nhận
};

export default function BattleRequestModal({ visible, user, onClose, mode = 'receiver' }: BattleRequestModalProps) {
    const router = useRouter();
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (!visible) return;
        setTimer(10); // reset timer khi modal mở
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    // onClose();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [visible]);

    const handleAccept = () => {
        onClose();
        router.push(`/match/${user?.id}`);
    };

    const handleRefuse = () => {
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <ThemedView style={styles.modalContent}>
                    <ThemedText style={styles.title}>
                        {mode === 'receiver'
                            ? `${user?.name} muốn chiến đấu với bạn!`
                            : `Đang chờ ${user?.name} phản hồi...`}
                    </ThemedText>
                    <ThemedText>Thời gian còn lại: {timer}s</ThemedText>

                    <View style={styles.buttonRow}>
                        {mode === 'receiver' ? (
                            <>
                                <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                                    <ThemedText style={styles.buttonText}>Accept</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.refuseButton} onPress={handleRefuse}>
                                    <ThemedText style={styles.buttonText}>Refuse</ThemedText>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                            </TouchableOpacity>
                        )}
                    </View>
                </ThemedView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        width: '100%',
    },
    acceptButton: {
        flex: 1,
        backgroundColor: '#FF9800',

        paddingVertical: 12,
        marginRight: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    refuseButton: {
        flex: 1,
        backgroundColor: '#666',

        paddingVertical: 12,
        marginLeft: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#666',

        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
