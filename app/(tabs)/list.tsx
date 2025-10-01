import React, { useEffect, useState } from 'react';

import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { RootState } from '@/store/reducers';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import CategoryList from '@/components/category-list';
import HorizontalList from '@/components/horizontal-list';
import ListHeader from '@/components/list-header';

import { collectionService } from '@/services';

function List() {
    const collections = useSelector((state: RootState) => state.learningList.collections);

    const [progressList, setProgressList] = useState<CollectionProgress[]>([]);

    useEffect(() => {
        setProgressList(collections.filter((item: CollectionProgress) => item.status === 'in_progress'));
    }, [collections]);

    const {
        data: allList = [],
        isLoading: isLoadingAll,
        error: errorAll,
    } = useQuery({
        queryKey: ['allList'],
        queryFn: collectionService.getAllCollection,
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
                            list={progressList}
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
