import { FlatList, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { AddSquareIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { getRandomColor } from '@/utils';

import { ThemedText } from './ThemedText';
import Button from './button';

const data = [
    {
        name: 'Common Words',
        cards: 639,
        icon: '👨‍🎓',
    },
    {
        name: 'Business English',
        cards: 420,
        icon: '💼',
    },
    {
        name: 'Travel & Tourism',
        cards: 310,
        icon: '✈️',
    },
    {
        name: 'TOEIC Practice',
        cards: 550,
        icon: '📚',
    },
    {
        name: 'Daily Conversations',
        cards: 275,
        icon: '🗣️',
    },
];

interface HorizontalListProps {
    headerName?: string;
    containerStyle: ViewStyle;
    isRandomColor?: boolean;
}

function HorizontalList({ headerName = 'Popular', containerStyle, isRandomColor = false }: HorizontalListProps) {
    const lighterText = useThemeColor({}, 'lighterText');
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    const theme = useColorScheme();

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <ThemedText type="title" style={styles.headerName}>
                {headerName}
            </ThemedText>

            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                    const backgroundColor = isRandomColor ? getRandomColor(theme) : white;
                    return (
                        <View style={[styles.item, { backgroundColor: backgroundColor }]}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemIcon}>{item.icon}</Text>
                                <Button style={{ paddingVertical: 0 }}>
                                    <HugeiconsIcon icon={AddSquareIcon} size={32} color={textColor} />
                                </Button>
                            </View>
                            <ThemedText type="subtitle" style={styles.itemTitle}>
                                {item.name}
                            </ThemedText>
                            <ThemedText style={[styles.itemNumber, { color: lighterText }]}>
                                {item.cards} cards
                            </ThemedText>
                        </View>
                    );
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

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        elevation: 5,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
