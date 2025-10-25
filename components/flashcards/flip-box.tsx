import { StyleSheet, View } from 'react-native';

import { Quiz } from '@/types/quiz';
import FlipCard from 'react-native-flip-card';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';

type FlipBoxProps = {
    flip: boolean;
    onFlip: () => void;
    quiz: Quiz;
};

function FlipBox({ flip, onFlip, quiz }: FlipBoxProps) {
    const mainBoxBg = useThemeColor({}, 'mainBoxBg');

    return (
        <View style={[styles.flip]}>
            <FlipCard
                flip={flip}
                style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: mainBoxBg,
                    borderWidth: 1.5,
                    borderColor: '#909090ff',
                    borderRadius: 16,
                }}
                friction={9}
                flipHorizontal={true}
                flipVertical={false}
                perspective={1000}
            >
                <View style={styles.card}>
                    <ThemedText type="title">{quiz.en_word}</ThemedText>
                </View>
                <View style={styles.card}>
                    <ThemedText type="title">{quiz.vn_word}</ThemedText>
                </View>
            </FlipCard>
        </View>
    );
}

export default FlipBox;

const styles = StyleSheet.create({
    flip: {
        flex: 1,
        borderRadius: 16,
    },

    card: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
