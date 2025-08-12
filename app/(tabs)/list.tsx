import React from 'react';

import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryList from '@/components/category-list';
import HorizontalList from '@/components/horizontal-list';
import ListHeader from '@/components/list-header';

function List() {
    return (
        <SafeAreaView style={[styles.wrapper]}>
            <ListHeader />
            <BottomSheetModalProvider>
                <View>
                    <ScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 80 }}>
                        <HorizontalList isRandomColor containerStyle={{ marginTop: 24 }} />
                        <HorizontalList headerName="Your List" containerStyle={{ marginTop: 24 }} />
                        <CategoryList />
                    </ScrollView>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
export default List;
