import { ReactNode, useCallback, useRef, useState } from 'react';

import { FlatList, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { ItemType } from '@/app/(tabs)/list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AddSquareIcon, SettingsIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Bar } from 'react-native-progress';

import { useThemeColor } from '@/hooks/useThemeColor';

import { getRandomColor } from '@/utils';

import { ThemedText } from './ThemedText';
import Button from './button';
import ListRegister from './list-register';
import ModalBottomSheet from './modal-bottom-sheet';
import RegisteredListStats from './registered-list-stats';

interface HorizontalListProps {
    headerName?: string;
    containerStyle: ViewStyle;
    isRandomColor?: boolean;
    isLearningList?: boolean;
    list: any;
}

type ListItemType = {
    isRandomColor: boolean;
    isRegistered: boolean | undefined;
    isLearningList: boolean | undefined;
    onOpenModal: (name: number) => void;
    name: string;
    icon: ReactNode | string;
    cardCount: number;
    masteredCount?: number;
    id: number;
};

const ListItem = ({
    isRandomColor = false,
    isRegistered = false,
    isLearningList = false,
    onOpenModal,
    name,
    icon,
    cardCount = 0,
    masteredCount,
    id,
}: ListItemType) => {
    const theme = useColorScheme();
    const lighterText = useThemeColor({}, 'lighterText');
    const textColor = useThemeColor({}, 'text');
    const white = useThemeColor({}, 'white');

    const backgroundColor = isRandomColor ? getRandomColor(theme) : white;
    return (
        <View style={[styles.item, { backgroundColor: backgroundColor }]}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemIcon}>{icon}</Text>
                <Button style={{ paddingVertical: 0 }} onPress={() => onOpenModal(id)}>
                    {isRegistered ? (
                        <HugeiconsIcon icon={SettingsIcon} size={24} color={textColor} />
                    ) : (
                        <HugeiconsIcon icon={AddSquareIcon} size={28} color={textColor} />
                    )}
                </Button>
            </View>

            <ThemedText type="subtitle" style={styles.itemTitle} numberOfLines={2}>
                {name}
            </ThemedText>

            {isLearningList ? (
                <View style={{ flex: 1 }}>
                    <View>
                        <ThemedText
                            style={{
                                fontSize: 16,
                                fontWeight: 500,
                                marginBottom: 4,
                            }}
                        >
                            {masteredCount}
                            <ThemedText lighter>/{cardCount} cards</ThemedText>
                        </ThemedText>
                    </View>
                    <Bar
                        color="#4CAF50"
                        progress={0.4}
                        width={null}
                        borderWidth={0}
                        height={6}
                        unfilledColor="rgba(198, 198, 198, 0.4)"
                    />
                </View>
            ) : (
                <ThemedText style={[styles.itemNumber, { color: lighterText }]}>{cardCount} cards</ThemedText>
            )}
        </View>
    );
};

function HorizontalList({
    headerName = 'Popular',
    containerStyle,
    isRandomColor = false,
    list,
    isLearningList,
}: HorizontalListProps) {
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback((itemId: string | number) => {
        const found = list.find((i: any) => i.id === itemId) || null;
        setSelectedItem(found);
        if (found) bottomSheetModalRef.current?.present();
    }, []);

    const closeBottomModalSheet = () => {
        if (!bottomSheetModalRef.current) return;
        bottomSheetModalRef.current?.close();
    };

    const handleConfirm = (goal: number) => {
        console.log(goal);
    };

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <ThemedText style={styles.headerName}>{headerName}</ThemedText>
            <FlatList
                horizontal
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if (isLearningList) {
                        return (
                            <ListItem
                                key={item.id}
                                isRandomColor={isRandomColor}
                                isRegistered={true}
                                onOpenModal={handlePresentModalPress}
                                icon="1️⃣"
                                name={item?.collection?.name}
                                isLearningList={isLearningList}
                                cardCount={item?.collection?.card_count}
                                masteredCount={item.mastered_card_count}
                                id={item.id}
                            />
                        );
                    } else {
                        return (
                            <ListItem
                                key={item.id}
                                isRandomColor={isRandomColor}
                                isRegistered={false}
                                onOpenModal={handlePresentModalPress}
                                icon="1️⃣"
                                name={item.name}
                                isLearningList={false}
                                cardCount={item.card_count}
                                id={item.id}
                            />
                        );
                    }
                }}
                contentContainerStyle={{ columnGap: 8, paddingVertical: 16 }}
                showsHorizontalScrollIndicator={false}
            />

            <ModalBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                {selectedItem?.isRegistered ? (
                    <RegisteredListStats title={selectedItem.name} />
                ) : (
                    <ListRegister
                        description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                        title={selectedItem ? selectedItem?.name : ''}
                        onConfirm={handleConfirm}
                        onClose={closeBottomModalSheet}
                        isRegistered={selectedItem?.isRegistered}
                    />
                )}
            </ModalBottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    headerName: {
        letterSpacing: 0.5,
        fontWeight: 600,
        fontSize: 24,
        flex: 1,
    },
    list: {
        marginVertical: 24,
    },
    item: {
        padding: 20,
        paddingHorizontal: 32,
        borderRadius: 20,
        rowGap: 8,
        maxWidth: 300,
        minWidth: 250,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        elevation: 5,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    itemIcon: {
        fontSize: 28,
    },
    itemTitle: {
        fontSize: 18,
    },
    itemNumber: {
        fontWeight: 500,
    },
});

export default HorizontalList;
