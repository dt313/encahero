import { StyleSheet, View } from 'react-native';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

const list = [
    {
        name: 'Common Words',
        total: 100,
        count: 12,
    },
    {
        name: 'Business Vocabulary',
        total: 80,
        count: 25,
    },
    {
        name: 'Travel Phrases',
        total: 60,
        count: 15,
    },
    {
        name: 'Academic Words',
        total: 120,
        count: 40,
    },
    {
        name: 'Idioms & Expressions',
        total: 90,
        count: 22,
    },
    {
        name: 'TOEIC Listening Keywords',
        total: 70,
        count: 18,
    },
    {
        name: 'Daily Conversation',
        total: 110,
        count: 30,
    },
];
function CategoryList() {
    const textColor = useThemeColor({}, 'text');
    return (
        <View style={[styles.wrapper]}>
            <ThemedText type="title" style={styles.headerName}>
                Category
            </ThemedText>

            <View style={styles.body}>
                {list.map((item: any, index: number) => {
                    return (
                        <View key={item.name} style={[styles.item, { borderColor: '#7d7d7d77' }]}>
                            <View style={styles.header}>
                                <ThemedText type="defaultSemiBold" style={styles.itemName}>
                                    {item.name}
                                </ThemedText>
                                <ThemedText lighter>{item.total} list</ThemedText>
                            </View>
                            <Button type="link">
                                <HugeiconsIcon icon={ArrowRight01Icon} color={textColor} />
                            </Button>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 24,
    },
    headerName: {
        letterSpacing: 0.5,
    },

    body: {
        marginTop: 20,
        rowGap: 8,
    },
    item: {
        borderRadius: 30,
        padding: 20,
        paddingBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderWidth: 1.2,
    },
    itemName: {
        marginBottom: 4,
        flex: 1,
        textOverflow: 'es',
    },
    header: {},
});

export default CategoryList;
