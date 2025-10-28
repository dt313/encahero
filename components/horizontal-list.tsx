import { ReactNode, useRef, useState } from 'react';

import { FlatList, Platform, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useThemeSwitcher } from '@/context/custom-theme-provider';
import { register } from '@/store/action/learning-list-action';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
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
    containerStyle?: ViewStyle;
    isRandomColor?: boolean;
    isLearningList?: boolean;
    list: CollectionProgress[];
    isVertical?: boolean;
}

type ListItemType = {
    isRandomColor: boolean;
    isRegistered: boolean | undefined;
    name: string;
    icon: ReactNode | string;
    cardCount: number;
    masteredCount?: number;
    id: number;
    isShowBar: boolean;
    containerStyle?: ViewStyle;
};

const ListItem = ({
    isRandomColor = false,
    isRegistered = false,
    name,
    icon,
    cardCount = 0,
    masteredCount,
    id,
    isShowBar,
    containerStyle,
}: ListItemType) => {
    const { mode } = useThemeSwitcher();
    const lighterText = useThemeColor({}, 'lighterText');
    const textColor = useThemeColor({}, 'text');
    const mainBoxBg = useThemeColor({}, 'mainBoxBg');

    const backgroundColor = isRandomColor ? getRandomColor(mode) : mainBoxBg;
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

    const handleRegister = async (goal: number) => {
        try {
            const res = await collectionService.registerCollection(id, goal);
            if (res) {
                closeBottomModalSheet();
                showSuccessToast(`Register ${res.collection.name} successfully`);
                dispatch(
                    register({
                        ...res,
                        collection_id: res.collection_id,
                        collection: {
                            id: res.collection_id,
                            name: res.collection.name,
                            card_count: res.collection.card_count,
                            icon: res.collection.icon,
                        },
                        mastered_card_count: 0,
                        today_learned_count: 0,
                        learned_card_count: 0,
                        is_registered: true,
                    }),
                );
                setRegistered(true);
            }
        } catch (error) {
            showErrorToast(error);
        }
    };

    const progress = masteredCount && cardCount ? masteredCount / cardCount : 0;

    return (
        <View style={[styles.item, { backgroundColor: backgroundColor }, containerStyle]}>
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

            {isShowBar ? (
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
                            <ThemedText lighter>/{cardCount} thẻ</ThemedText>
                        </ThemedText>
                    </View>
                    {progress > 0 && (
                        <Bar
                            color="#4CAF50"
                            progress={progress}
                            width={null}
                            borderWidth={0}
                            height={6}
                            unfilledColor="rgba(198, 198, 198, 0.4)"
                        />
                    )}
                </View>
            ) : (
                <ThemedText style={[styles.itemNumber, { color: lighterText }]}>{cardCount} cards</ThemedText>
            )}

            <ModalBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
                {registered ? (
                    <RegisteredListStats id={id} title={name} onClose={closeBottomModalSheet} />
                ) : (
                    <ListRegister
                        description="Chọn số lượng task bạn phải hoàn thành trong 1 ngày"
                        title={name}
                        onConfirm={handleRegister}
                        onClose={closeBottomModalSheet}
                        isRegistered={false}
                        id={id}
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
    isVertical = false,
}: HorizontalListProps) {
    const borderColor = useThemeColor({}, 'inputBorderColor');
    return (
        <View style={[styles.wrapper, containerStyle]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText style={styles.headerName}>{headerName}</ThemedText>
                <View
                    style={[
                        styles.headerLine,
                        {
                            backgroundColor: borderColor,
                        },
                    ]}
                />
            </View>
            <FlatList
                horizontal={!isVertical}
                data={list}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => {
                    if (isLearningList) {
                        return (
                            <ListItem
                                key={item.collection_id}
                                isRandomColor={isRandomColor}
                                isRegistered={true}
                                icon={item.collection.icon || '📗'}
                                name={item?.collection?.name}
                                cardCount={item?.collection?.card_count}
                                masteredCount={item.mastered_card_count}
                                id={item.collection_id}
                                isShowBar={true}
                            />
                        );
                    } else {
                        return (
                            <ListItem
                                key={item.id}
                                isRandomColor={isRandomColor}
                                isRegistered={item.is_registered}
                                icon={item.icon || '📗'}
                                name={item.name}
                                cardCount={item.card_count}
                                id={item.id}
                                isShowBar={false}
                                containerStyle={isVertical ? { maxWidth: '100%' } : undefined}
                            />
                        );
                    }
                }}
                style={{
                    marginTop: isVertical ? 12 : undefined,
                }}
                contentContainerStyle={{
                    columnGap: 8,
                    paddingVertical: 16,
                    rowGap: isVertical ? 12 : undefined,
                    paddingHorizontal: isVertical ? 24 : undefined,
                    paddingBottom: isVertical ? (Platform.OS === 'ios' ? 200 : 80) : 0,
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    headerName: {
        letterSpacing: 0.5,
        fontWeight: 500,
        fontSize: 20,
        marginRight: 8,
    },
    headerLine: {
        height: 1.5,
        flex: 1,
        borderRadius: 12,
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

        shadowColor: '#333',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,

        elevation: 1,
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
