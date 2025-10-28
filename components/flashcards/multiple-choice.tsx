import { useEffect, useMemo, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import type { AnswerType, Quiz } from '@/types/quiz';
import { AnswerState, QuizDirection } from '@/types/quiz';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';
import EngToVi from './en2vi';
import MultipleChoiceAnswer from './multiple-choice-answer';
import ViToEng from './vi2en';

function MultipleChoice({ quiz, type, onSubmit }: { quiz: Quiz; type: QuizDirection; onSubmit: () => void }) {
    const mainBoxBg = useThemeColor({}, 'mainBoxBg');
    const shadowColor = useThemeColor({}, 'shadowColor');

    const reviewTagBorderColor = useThemeColor({}, 'reviewTagBorderColor');
    const reviewTagBg = useThemeColor({}, 'reviewTagBg');
    const reviewTagColor = useThemeColor({}, 'reviewTagColor');

    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [isCorrected, setIsCorrected] = useState<boolean>(false);
    const correctAnswer = useMemo(() => (type === QuizDirection.V2E ? quiz.en_word : quiz.vn_word), [type, quiz]);

    useEffect(() => {
        const choices = type === QuizDirection.V2E ? quiz.en_choice : quiz.vn_choice;

        const shuffled = [...choices].sort(() => Math.random() - 0.5);

        // Khởi tạo answers
        const initAnswers: AnswerType[] = shuffled.map((text) => ({
            text,
            state: AnswerState.UNSET,
        }));

        setAnswers(initAnswers);
    }, [quiz, type]);

    const handleAnswer = (ans: string) => {
        const stateAnswer = answers.map((a) => {
            if (a.text === ans) {
                if (ans === correctAnswer) {
                    a.state = AnswerState.TRUE;
                    setIsCorrected(true);
                    setTimeout(() => {
                        onSubmit();
                        setIsCorrected(false);
                    }, 1000);
                } else a.state = AnswerState.FALSE;
            }

            return a;
        });

        setAnswers(stateAnswer);
    };

    return (
        <View style={[styles.wrapper, { backgroundColor: mainBoxBg, shadowColor }]}>
            <View style={[styles.questionBox]}>
                <View style={styles.wordType}>
                    <ThemedText
                        style={[
                            styles.type,
                            {
                                borderColor: reviewTagBorderColor,
                                color: reviewTagColor,
                                backgroundColor: reviewTagBg,
                            },
                        ]}
                    >
                        Ôn tập
                    </ThemedText>
                </View>

                {type === QuizDirection.E2V ? (
                    <EngToVi text={quiz.en_word} />
                ) : (
                    <ViToEng
                        meaning={quiz.meaning}
                        example={quiz.ex[0]}
                        url={quiz?.image_url}
                        type={quiz.type}
                        phonetic={quiz.phonetic}
                    />
                )}
            </View>
            <View style={[styles.answersBox, { backgroundColor: mainBoxBg }]}>
                {answers.map((ans, index) => {
                    return (
                        <MultipleChoiceAnswer
                            key={ans.text}
                            state={ans.state}
                            text={ans.text}
                            number={index}
                            disabled={isCorrected}
                            onAnswer={handleAnswer}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        rowGap: 12,
        padding: 16,
        paddingVertical: 30,
        borderRadius: 16,

        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        // Shadow Android
        elevation: 1,
    },
    questionBox: {
        paddingTop: 24,
        marginBottom: 12,
    },

    answersBox: {
        marginTop: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12, // RN 0.71+ mới hỗ trợ gap
    },

    wordType: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },

    type: {
        borderWidth: 1.5,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
});

export default MultipleChoice;
