import { StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ReviewCard from '@/components/flashcards/review-card';

function Quiz() {
    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
            {/* TODO : Header  */}

            <View style={styles.flashcards}>
                <ReviewCard />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flashcards: {
        flex: 1,
    },
});

export default Quiz;
