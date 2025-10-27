import React from 'react';

import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import CardStats from '@/components/card-stats';

import { useThemeColor } from '@/hooks/useThemeColor';

import getImageUrl from '@/utils/get-img-url';

type CardModalProps = {
    isOpen: boolean;
    onClose: () => void;
    word: any;
    onRemove?: () => void;
};

function CardModal({ isOpen, onClose, word, onRemove }: CardModalProps) {
    const backgroundColor = useThemeColor({}, 'background');
    const black = useThemeColor({}, 'black');
    const removeButtonBg = useThemeColor({}, 'removeButtonBg');

    return (
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor }]}>
                    <View style={styles.content}>
                        {getImageUrl(word?.image_url) ? (
                            <Image
                                source={{
                                    uri: getImageUrl(word.image_url) || '',
                                }}
                                style={styles.modalImage}
                            />
                        ) : (
                            <></>
                        )}
                        <ThemedText style={styles.modalTitle}>{word?.en_word}</ThemedText>
                        {/* <ThemedText style={styles.modalSubtitle}>{word?.vn_word}</ThemedText> */}
                        <ThemedText style={styles.modalMeaning}>{word?.meaning}</ThemedText>
                        {/* {selectedWord?.ex?.map((ex: string, i: number) => (
                                <ThemedText key={i} style={styles.modalExample}>
                                    - {ex}
                                </ThemedText>
                            ))} */}

                        {word?.stats && (
                            <CardStats
                                status={word.stats.status}
                                rating={word.stats.rating}
                                learned_count={word.stats.learned_count}
                            />
                        )}
                    </View>

                    <TouchableOpacity style={[styles.closeIcon]} onPress={onClose}>
                        <HugeiconsIcon icon={Cancel01Icon} color={black} />
                    </TouchableOpacity>

                    {word?.stats?.status === 'mastered' && (
                        <Button buttonStyle={{ borderRadius: 50, backgroundColor: removeButtonBg }} onPress={onRemove}>
                            Remove from mastered
                        </Button>
                    )}
                </View>
            </View>
        </Modal>
    );
}

export default CardModal;

const styles = StyleSheet.create({
    // modal

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',

        borderRadius: 12,
        paddingTop: 40,
        padding: 16,

        // shadow iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // elevation Android
        elevation: 1,
    },
    content: {
        alignItems: 'center',
        marginBottom: 16,
    },
    modalImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    modalMeaning: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalExample: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        padding: 6,
        borderRadius: 12,
    },

    closeIconText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    progressContainer: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    progressText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
});
