import { ScrollView, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ListHeader from '@/components/list-header';

function List() {
    return (
        <ScrollView>
            <SafeAreaView style={styles.wrapper}>
                <ListHeader />
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        paddingBottom: 80,
    },
});
export default List;
