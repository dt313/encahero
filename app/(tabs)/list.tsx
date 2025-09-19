import React from 'react';

import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { RootState } from '@/store/reducers';
import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import CategoryList from '@/components/category-list';
import HorizontalList from '@/components/horizontal-list';
import ListHeader from '@/components/list-header';

import { collectionService } from '@/services';

export type ItemType = {
    name: string;
    cards: number;
    icon: string;
    isRegistered?: boolean;
    isLearningList?: boolean;
};

function List() {
    const collections = useSelector((state: RootState) => state.learningList.collections);
    const isFocused = useIsFocused();
    const {
        data: allList = [],
        isLoading: isLoadingAll,
        error: errorAll,
    } = useQuery({
        queryKey: ['allList'],
        queryFn: collectionService.getAllCollection,
        enabled: isFocused,
    });

    return (
        <SafeAreaView style={[styles.wrapper]}>
            <ListHeader />
            <View>
                <ScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 80 }}>
                    <View
                        style={{
                            paddingHorizontal: 20,
                        }}
                    >
                        <HorizontalList isRandomColor containerStyle={{ marginTop: 24 }} list={allList} />
                        <HorizontalList
                            headerName="Learning List"
                            containerStyle={{ marginTop: 24 }}
                            list={collections}
                            isLearningList={true}
                        />
                        <CategoryList />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

export default List;
