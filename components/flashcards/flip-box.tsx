import { StyleSheet, View } from 'react-native';

import { Quiz } from '@/types/quiz';
import FlipCard from 'react-native-flip-card';
import { ScrollView } from 'react-native-gesture-handler';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';
import ViToEng from './vi2en';

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
                    <View
                        onStartShouldSetResponder={() => true}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ThemedText type="title">{quiz.en_word}</ThemedText>
                        <ThemedText style={{ fontSize: 20 }}>
                            {' '}
                            ({quiz.type}) - {quiz.phonetic}
                        </ThemedText>
                    </View>
                </View>
                <View style={[styles.card]}>
                    <ScrollView
                        contentContainerStyle={{
                            paddingVertical: 12,
                            paddingHorizontal: 4,
                        }}
                    >
                        <View
                            onStartShouldSetResponder={() => true}
                            style={{
                                // backgroundColor: 'red',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <ViToEng
                                meaning={quiz.meaning}
                                example={quiz.ex[0]}
                                url={quiz.image_url}
                                type={quiz.type}
                                hideType={true}
                                phonetic={quiz.phonetic}
                            />
                        </View>
                    </ScrollView>
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
