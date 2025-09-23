import { ReactNode, useRef, useState } from 'react';

import { FlatList, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { register } from '@/store/action/learning-list-action';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AddSquareIcon, SettingsIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Bar } from 'react-native-progress';
import { useDispatch } from 'react-redux';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { getRandomColor } from '@/utils';

import { collectionService } from '@/services';

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
    name: string;
    icon: ReactNode | string;
    cardCount: number;
    masteredCount?: number;
    id: number;
};

const ListItem = ({
    isRandomColor = false,
    isRegistered = false,
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
    const { showErrorToast, showSuccessToast } = useToast();
    const [registered, setRegistered] = useState(isRegistered);
    const dispatch = useDispatch();
    const closeBottomModalSheet = () => {
        if (!bottomSheetModalRef.current) return;
        bottomSheetModalRef.current?.close();
    };

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = () => {
        bottomSheetModalRef.current?.present();
    };

    const handleConfirm = async (goal: number) => {
        console.log({ goal });
        try {
            const res = await collectionService.registerCollection(id, goal);
            if (res) {
                closeBottomModalSheet();
                showSuccessToast(`Register ${res.name} successfully`);
                dispatch(
                    register({
                        ...res,
                        collection: {
                            id: res.id,
                            name,
                            card_count: 0,
                        },
                        mastered_card_count: 0,
                        today_learned_count: 0,
                    }),
                );
                setRegistered(true);
            }
        } catch (error) {
            showErrorToast(error);
        }
    };

    return (
        <View style={[styles.item, { backgroundColor: backgroundColor }]}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemIcon}>{icon}</Text>
                <Button style={{ paddingVertical: 0 }} onPress={handlePresentModalPress}>
                    {registered ? (
                        <HugeiconsIcon icon={SettingsIcon} size={24} color={textColor} />
                    ) : (
                        <HugeiconsIcon icon={AddSquareIcon} size={28} color={textColor} />
                    )}
                </Button>
            </View>

            <ThemedText type="subtitle" style={styles.itemTitle} numberOfLines={2}>
                {name}
            </ThemedText>

            {registered ? (
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

            <ModalBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                {registered ? (
                    <RegisteredListStats id={id} title={name} />
                ) : (
                    <ListRegister
                        description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                        title={name}
                        onConfirm={handleConfirm}
                        onClose={closeBottomModalSheet}
                        isRegistered={false}
                    />
                )}
            </ModalBottomSheet>
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
                                icon="1️⃣"
                                name={item?.collection?.name}
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
                                isRegistered={item.is_registered}
                                icon="1️⃣"
                                name={item.name}
                                cardCount={item.card_count}
                                id={item.id}
                            />
                        );
                    }
                }}
                contentContainerStyle={{ columnGap: 8, paddingVertical: 16 }}
                showsHorizontalScrollIndicator={false}
            />
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
