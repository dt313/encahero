import { useEffect, useMemo, useState } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Quiz } from '@/types/quiz';
import { QuizDirection } from '@/types/quiz';
import { Cancel01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';
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
    type = '',
    url = "'",
}: {
    meaning: string;
    example: string;
    url?: string;
    type: string;
}) => {
    return (
        <View>
            <View>
                <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                    Định nghĩa:{' '}
                </ThemedText>

                <ThemedText
                    style={{
                        fontWeight: 400,
                    }}
                >
                    {meaning}
                </ThemedText>
                {type && (
                    <ThemedText
                        type="subtitle"
                        style={{
                            fontSize: 16,
                            marginVertical: 12,
                        }}
                    >
                        {type}
                    </ThemedText>
                )}
                {example && (
                    <View>
                        <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                            Ví dụ:
                        </ThemedText>
                        <ThemedText
                            style={{
                                marginBottom: 12,
                                fontWeight: 400,
                            }}
                        >
                            {example}
                        </ThemedText>
                    </View>
                )}
            </View>

            <Image
                source={{
                    uri: 'https://www.shutterstock.com/shutterstock/photos/795957880/display_1500/stock-photo-female-hands-holding-young-green-plant-on-black-isolated-background-nature-growth-and-care-795957880.jpg',
                }}
                style={{
                    width: 'auto',
                    height: 100,
                }}
                resizeMode="contain"
            />
        </View>
    );
};

function MultipleChoice({ quiz, type, onSubmit }: { quiz: Quiz; type: QuizDirection; onSubmit: () => void }) {
    const mainBoxBg = useThemeColor({}, 'mainBoxBg');
    const shadowColor = useThemeColor({}, 'shadowColor');
    const inputBorderColor = useThemeColor({}, 'inputBorderColor');
    const choiceNumberBg = useThemeColor({}, 'choiceNumberBg');
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

    const getState = (state: AnswerState, index: number) => {
        switch (state) {
            case AnswerState.TRUE:
                return <HugeiconsIcon icon={Tick01Icon} color={commonColor.trueBorderColor} size={18} />;
            case AnswerState.FALSE:
                return <HugeiconsIcon icon={Cancel01Icon} color={commonColor.failBorderColor} size={18} />;
            default:
                return <Text>{index + 1}</Text>;
        }
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
                    <ViToEng meaning={quiz.meaning} example={quiz.ex[0]} url={quiz?.image_url} type={quiz.type} />
                )}
            </View>
            <View style={[styles.answersBox, { backgroundColor: mainBoxBg }]}>
                {answers.map((ans, index) => {
                    return (
                        <TouchableOpacity
                            style={[
                                styles.answer,
                                { borderColor: inputBorderColor },
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
                            disabled={isCorrected}
                        >
                            <View
                                style={[
                                    styles.answerNumber,
                                    { backgroundColor: choiceNumberBg },
                                    ans.state !== AnswerState.UNSET ? { backgroundColor: 'transparent' } : undefined,
                                ]}
                            >
                                <ThemedText style={[styles.answerNumberText]}>{getState(ans.state, index)}</ThemedText>
                            </View>
                            <ThemedText style={[styles.answerText]}>{ans.text}</ThemedText>
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

    answer: {
        width: '48%', // để chừa khoảng gap
        borderWidth: 1.5,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },

    answerNumber: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
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

    answerNumberText: {
        fontWeight: 600,
        fontSize: 12,
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
