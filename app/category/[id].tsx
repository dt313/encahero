import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import BackIcon from '@/components/back-icon';

import { useThemeColor } from '@/hooks/useThemeColor';

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

export default function CategoryDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const handleBack = () => {
        try {
            router.back();
        } catch {
            router.replace('/list');
        }
    };

    const textColor = useThemeColor({}, 'text');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <BackIcon onPress={handleBack} />
                <ThemedText type="title" style={styles.headerName} numberOfLines={1}>
                    Common Words {id}
                </ThemedText>
            </View>

            <ScrollView>
                <View style={styles.body}>
                    {list.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity
                                key={item.name}
                                onPress={() => router.push(`/category/${id}/collection/1`)}
                            >
                                <View style={[styles.item, { borderColor: '#7d7d7d77' }]}>
                                    <View style={styles.itemHeader}>
                                        <ThemedText type="defaultSemiBold" style={styles.itemName}>
                                            {item.name}
                                        </ThemedText>
                                        <ThemedText lighter>{item.total} cards</ThemedText>
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
});
