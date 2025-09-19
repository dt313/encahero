import { useEffect, useState } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Cancel01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';
import { Quiz, QuizDirection } from '../random-quiz';
import TextWithSound from '../text-with-sound';

enum AnswerState {
    UNSET = 'UNSET',
    FALSE = 'FALSE',
    TRUE = 'TRUE',
}

type AnswerType = {
    text: string;
    state: AnswerState;
};

const EngToVi = ({ text }: { text: string }) => {
    return (
        <View>
            <TextWithSound textType="title" text={text} />
            <ThemedText type="subtitle">(noun) /ˌvɒlənˈtɪər/</ThemedText>
        </View>
    );
};

export const ViToEng = ({
    meaning = '',
    example = '',
    url = "'",
}: {
    meaning: string;
    example: string;
    url?: string;
}) => {
    return (
        <View>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                Định nghĩa:{' '}
            </ThemedText>
            <ThemedText
                style={{
                    marginBottom: 12,
                    fontWeight: 400,
                }}
            >
                {meaning}
            </ThemedText>
            <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                Ví dụ:{' '}
            </ThemedText>
            <ThemedText
                style={{
                    marginBottom: 12,
                    fontWeight: 400,
                }}
            >
                {example}
            </ThemedText>

            {url && (
                <Image
                    source={{ uri: url }}
                    style={{
                        maxHeight: 100,
                        maxWidth: 200,
                        resizeMode: 'contain',
                    }}
                />
            )}
        </View>
    );
};

function MultipleChoice({ quiz, type }: { quiz: Quiz; type: QuizDirection }) {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const correctAnswer = type === QuizDirection.V2E ? quiz.en_word : quiz.vn_word;

    useEffect(() => {
        const choices = type === QuizDirection.V2E ? quiz.en_choice : quiz.vn_choice;

        const shuffled = [...choices].sort(() => Math.random() - 0.5);

        // Khởi tạo answers
        const initAnswers: AnswerType[] = shuffled.map((text) => ({
            text,
            state: AnswerState.UNSET,
        }));

        setAnswers(initAnswers);
    }, [quiz]);

    const handleAnswer = (ans: string) => {
        const stateAnswer = answers.map((a) => {
            if (a.text === ans) {
                if (ans === correctAnswer) a.state = AnswerState.TRUE;
                else a.state = AnswerState.FALSE;
            }

            return a;
        });

        setAnswers(stateAnswer);
    };

    const getState = (state: AnswerState, index: number) => {
        switch (state) {
            case AnswerState.TRUE:
                return <HugeiconsIcon icon={Tick01Icon} color={commonColor.trueBorderColor} size={24} />;
            case AnswerState.FALSE:
                return <HugeiconsIcon icon={Cancel01Icon} color={commonColor.failBorderColor} size={24} />;
            default:
                return <Text>{index + 1}</Text>;
        }
    };

    return (
        <View style={[styles.wrapper, { backgroundColor: backgroundColor }]}>
            <View style={[styles.questionBox]}>
                <View style={styles.wordType}>
                    <ThemedText style={styles.type}>New</ThemedText>
                </View>

                {type === QuizDirection.E2V ? (
                    <EngToVi text={quiz.en_word} />
                ) : (
                    <ViToEng meaning={quiz.meaning} example={quiz.ex[0]} url={quiz?.image_url} />
                )}
            </View>
            <View style={[styles.answersBox, { backgroundColor: backgroundColor }]}>
                {answers.map((ans, index) => {
                    return (
                        <TouchableOpacity
                            style={[
                                styles.answer,
                                ans.state === AnswerState.FALSE && {
                                    borderColor: commonColor.failBorderColor,
                                    backgroundColor: commonColor.failBgColor,
                                },
                                ans.state === AnswerState.TRUE && {
                                    borderColor: commonColor.trueBorderColor,
                                    backgroundColor: commonColor.trueBgColor,
                                },
                            ]}
                            key={ans.text}
                            onPress={() => handleAnswer(ans.text)}
                        >
                            <View
                                style={[
                                    styles.answerNumber,
                                    ans.state !== AnswerState.UNSET ? { backgroundColor: 'transparent' } : undefined,
                                ]}
                            >
                                {getState(ans.state, index)}
                            </View>
                            <ThemedText
                                style={[
                                    styles.answerText,
                                    {
                                        color: textColor,
                                    },
                                ]}
                            >
                                {ans.text}
                            </ThemedText>
                        </TouchableOpacity>
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
        borderRadius: 16,
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

    answer: {
        width: '48%', // để chừa khoảng gap
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },

    answerNumber: {
        backgroundColor: '#f8fafd',
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 50,
        marginRight: 12,
        fontWeight: 500,
    },

    answerText: {
        flexShrink: 1,
        flexWrap: 'wrap',
        width: '100%',
        fontWeight: 500,
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
        borderColor: '#4f4f4fff',
    },
});

export default MultipleChoice;
