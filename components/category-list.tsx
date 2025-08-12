import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

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
    const router = useRouter();
    return (
        <View style={[styles.wrapper]}>
            <ThemedText type="title" style={styles.headerName}>
                Category
            </ThemedText>

            <View style={styles.body}>
                {list.map((item: any, index: number) => {
                    return (
                        <TouchableOpacity key={item.name} onPress={() => router.push('/category/1')}>
                            <View style={[styles.item, { borderColor: '#7d7d7d77' }]}>
                                <View style={styles.header}>
                                    <ThemedText type="defaultSemiBold" style={styles.itemName}>
                                        {item.name}
                                    </ThemedText>
                                    <ThemedText lighter>{item.total} list</ThemedText>
                                </View>
                                <View>
                                    <HugeiconsIcon icon={ArrowRight01Icon} color={textColor} />
                                </View>
                            </View>
                        </TouchableOpacity>
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
        fontWeight: 600,
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
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1.2,
    },
    itemName: {
        marginBottom: 4,
        flex: 1,
    },
    header: {},
});

export default CategoryList;
