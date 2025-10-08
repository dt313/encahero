import { useCallback, useRef, useState } from 'react';

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { register } from '@/store/action/learning-list-action';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import BackIcon from '@/components/back-icon';
import ListRegister from '@/components/list-register';
import ModalBottomSheet from '@/components/modal-bottom-sheet';
import RegisteredListStats from '@/components/registered-list-stats';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { categoryService, collectionService } from '@/services';

export default function CategoryDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const modalBottomRef = useRef<BottomSheetModal>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const backgroundColor = useThemeColor({}, 'background');
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { showErrorToast, showSuccessToast } = useToast();
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

    const handleOpenBottomModal = useCallback(
        (id: number) => {
            modalBottomRef.current?.present();
            const selected = collections.find((item: any) => item.id === id);
            setSelectedItem(selected);
        },
        [collections],
    );

    const closeBottomModalSheet = () => {
        if (!modalBottomRef.current) return;
        modalBottomRef.current?.close();
        setSelectedItem(null);
    };

    const handleRegister = async (goal: number) => {
        try {
            const res = await collectionService.registerCollection(selectedItem.id, goal);
            if (res) {
                showSuccessToast(`Register ${res.collection.name} successfully`);
                dispatch(
                    register({
                        ...res,
                        collection_id: res.id,
                        collection: {
                            id: res.id,
                            name: res.collection.name,
                            card_count: res.collection.card_count,
                        },
                        mastered_card_count: 0,
                        today_learned_count: 0,
                        learned_card_count: 0,
                        is_registered: true,
                    }),
                );

                // ✅ Update lại query cache của React Query
                queryClient.setQueryData<any[]>(['collectionsOfCategory'], (oldData = []) =>
                    oldData.map((item) => (item.id === selectedItem.id ? { ...item, is_registered: true } : item)),
                );

                closeBottomModalSheet();
            }
        } catch (error) {
            showErrorToast(error);
        }
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
                            <TouchableOpacity key={item.name} onPress={() => handleOpenBottomModal(item.id)}>
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
                {selectedItem?.is_registered ? (
                    <RegisteredListStats
                        id={selectedItem?.id}
                        title={selectedItem?.name}
                        onClose={closeBottomModalSheet}
                    />
                ) : (
                    <ListRegister
                        description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                        title={selectedItem?.name ?? ''}
                        onConfirm={handleRegister}
                        onClose={closeBottomModalSheet}
                        id={selectedItem?.id}
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
