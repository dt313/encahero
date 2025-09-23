import { useCallback, useRef, useState } from 'react';

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import BackIcon from '@/components/back-icon';
import ListRegister from '@/components/list-register';
import ModalBottomSheet from '@/components/modal-bottom-sheet';
import RegisteredListStats from '@/components/registered-list-stats';

import { useThemeColor } from '@/hooks/useThemeColor';

import { categoryService } from '@/services';

export default function CategoryDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const modalBottomRef = useRef<BottomSheetModal>(null);
    const [selectedItem, setSelectedItem] = useState<CollectionProgress | undefined>();
    const backgroundColor = useThemeColor({}, 'background');

    const {
        data: collections = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['collectionsOfCategory'],
        queryFn: () => categoryService.getCollectionsOfCategory(Number(id)),
    });

    const handleBack = () => {
        try {
            router.back();
        } catch {
            router.replace('/list');
        }
    };

    const textColor = useThemeColor({}, 'text');

    const handleOpenBottomModal = useCallback((id: number) => {
        modalBottomRef.current?.present();
        const selected = collections.find((item: CollectionProgress) => item.collection_id === id);
        setSelectedItem(selected);
    }, []);

    const closeBottomModalSheet = () => {
        if (!modalBottomRef.current) return;
        modalBottomRef.current?.close();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            <View style={styles.header}>
                <BackIcon onPress={handleBack} />
                <ThemedText type="title" style={styles.headerName} numberOfLines={1}>
                    {collections[0]?.category?.name}
                </ThemedText>
            </View>

            <ScrollView>
                <View style={styles.body}>
                    {collections.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity key={item.name} onPress={() => handleOpenBottomModal(item.collection_id)}>
                                <View style={[styles.item, { borderColor: '#7d7d7d77' }]}>
                                    <View style={styles.itemHeader}>
                                        <ThemedText type="defaultSemiBold" style={styles.itemName}>
                                            {item.name}
                                        </ThemedText>
                                        <ThemedText lighter>{item.card_count} cards</ThemedText>
                                    </View>
                                    <View>
                                        <HugeiconsIcon icon={ArrowRight01Icon} color={textColor} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <ModalBottomSheet bottomSheetModalRef={modalBottomRef}>
                {selectedItem?.isRegistered ? (
                    <RegisteredListStats id={selectedItem.collection_id} title={selectedItem.collection.name} />
                ) : (
                    <ListRegister
                        description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                        title={selectedItem ? selectedItem.collection.name : ''}
                        onConfirm={() => {}}
                        onClose={closeBottomModalSheet}
                    />
                )}
            </ModalBottomSheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
    },
    headerName: {
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 70, // tránh trùng back button
        flexWrap: 'wrap', // cho phép xuống dòng
    },

    body: {
        marginTop: 20,
        padding: 20,
        rowGap: 8,
    },
    item: {
        borderRadius: 30,
        padding: 20,
        paddingBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1.2,
    },

    itemHeader: {},
    itemName: {
        marginBottom: 4,
    },

    // modal
    modalContainer: {
        padding: 20,
        rowGap: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    registerButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    linkText: {
        marginTop: 14,
        color: '#007bff',
        fontSize: 15,
        textAlign: 'center',
    },
});
