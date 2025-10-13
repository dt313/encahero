// components/congrats-modal.tsx
import React from 'react';

import { StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';

interface CongratsModalProps {
    visible: boolean;
    onClose?: () => void;
}

const CongratsModal: React.FC<CongratsModalProps> = ({ visible, onClose }) => {
    const router = useRouter();

    if (!visible) return null;

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
                <ThemedText type="title" style={{ textAlign: 'center', marginBottom: 12 }}>
                    🎉 Chúc mừng! 🎉
                </ThemedText>
                <ThemedText type="default" style={{ textAlign: 'center', marginBottom: 20, fontSize: 20 }}>
                    Bạn đã hoàn thành danh sách này
                </ThemedText>
                <Button
                    buttonStyle={{ width: '100%', marginTop: 20 }}
                    onPress={() => {
                        onClose?.();
                        router.replace('/');
                    }}
                >
                    Go Home
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalBox: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1,
    },
});

export default CongratsModal;
