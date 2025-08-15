import { StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import MultipleChoice from '@/components/flashcards/multiple-choice';

function Quiz() {
    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
            {/* TODO : Header  */}

            <View style={styles.flashcards}>
                {/* <ReviewCard /> */}
                <MultipleChoice />
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
