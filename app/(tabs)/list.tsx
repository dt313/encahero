import { ScrollView, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryList from '@/components/category-list';
import PopularList from '@/components/horizontal-list';
import ListHeader from '@/components/list-header';

function List() {
    return (
        <SafeAreaView style={styles.wrapper}>
            <ListHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <PopularList isRandomColor containerStyle={{ marginTop: 24 }} />
                <PopularList headerName="Your List" containerStyle={{ marginTop: 24 }} />
                <CategoryList />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});
export default List;
