import { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Quiz, ReviewAnswerType } from '@/types/quiz';

import { REVIEW_ANSWERS } from '@/constants';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';
import Action from './action';
import FlipBox from './flip-box';

function ReviewCard({
    quiz,
    onSubmit,
    isNew,
}: {
    quiz: Quiz;
    onSubmit: (name: 'E' | 'M' | 'H') => void;
    isNew: boolean;
}) {
    const mainBoxBg = useThemeColor({}, 'mainBoxBg');
    const shadowColor = useThemeColor({}, 'shadowColor');

    const [flip, setFlip] = useState(false);
    const handleFlip = () => {
        setFlip(!flip);
    };

    const handleSubmit = (name: 'E' | 'M' | 'H') => {
        setTimeout(() => {
            onSubmit(name);
        }, 1000);
    };

    return (
        <View style={[styles.wrapper]}>
            <View style={[styles.questionBox, { backgroundColor: mainBoxBg, shadowColor }]}>
                <FlipBox flip={flip} onFlip={handleFlip} quiz={quiz} />
                <Action isNew={isNew} speakWord={quiz.en_word} onFlip={handleFlip} />
            </View>
            <View style={[styles.replyBox, { backgroundColor: mainBoxBg, shadowColor }]}>
                {REVIEW_ANSWERS.map((ans: ReviewAnswerType) => {
                    return (
                        <TouchableOpacity key={ans.title} style={styles.btn} onPress={() => handleSubmit(ans.name)}>
                            <Text
                                style={{
                                    fontSize: 24,
                                }}
                            >
                                {ans.icon}
                            </Text>
                            <ThemedText style={styles[ans.name]}>{ans.title}</ThemedText>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 500,
    },

    questionBox: {
        width: '100%',
        flex: 1,
        borderRadius: 16,
        padding: 12,
        rowGap: 12,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,

        // Shadow Android
        elevation: 1,
    },

    replyBox: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 16,
        height: 100,

        // Shadow iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        // Shadow Android
        elevation: 1,
    },

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
    },

    E: { color: '#4CAF50', fontWeight: '600' }, // xanh lá
    M: { color: '#FFC107', fontWeight: '600' }, // vàng cam
    H: { color: '#F44336', fontWeight: '600' }, // đỏ
});

export default ReviewCard;
