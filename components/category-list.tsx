import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useQuery } from '@tanstack/react-query';

import { useThemeColor } from '@/hooks/useThemeColor';

import { categoryService } from '@/services';

import { ThemedText } from './ThemedText';

type CategoryItemType = {
    id: number;
    name: string;
    collectionCount: number;
};

const CategoryItem = ({ id, name, collectionCount }: CategoryItemType) => {
    const textColor = useThemeColor({}, 'text');
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push(`/category/${id}`)}>
            <View style={[styles.item, { borderColor: '#7d7d7d77' }]}>
                <View style={styles.header}>
                    <ThemedText type="defaultSemiBold" style={styles.itemName}>
                        {name}
                    </ThemedText>
                    <ThemedText lighter>{collectionCount} list</ThemedText>
                </View>
                <View>
                    <HugeiconsIcon icon={ArrowRight01Icon} color={textColor} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

function CategoryList() {
    const {
        data: categories = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['allList'],
        queryFn: categoryService.getCategories,
    });

    return (
        <View style={[styles.wrapper]}>
            <ThemedText style={styles.headerName}>Category</ThemedText>

            <View style={styles.body}>
                {categories.map((item: any, index: number) => {
                    return (
                        <CategoryItem
                            key={index}
                            id={item.id}
                            name={item.name}
                            collectionCount={item.collection_count}
                        />
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
        fontSize: 24,
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
