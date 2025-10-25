import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AnswerState } from '@/types/quiz';
import { Cancel01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';

type MultipleChoiceAnswerProps = {
    text: string;
    number: number;
    state: AnswerState;
    disabled: boolean;
    onAnswer: (ans: string) => void;
};

function MultipleChoiceAnswer({ text, number, state, disabled, onAnswer }: MultipleChoiceAnswerProps) {
    const inputBorderColor = useThemeColor({}, 'inputBorderColor');
    const choiceNumberBg = useThemeColor({}, 'choiceNumberBg');

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
        <TouchableOpacity
            style={[
                styles.answer,
                { borderColor: inputBorderColor },
                state === AnswerState.FALSE && {
                    borderColor: commonColor.failBorderColor,
                    backgroundColor: commonColor.failBgColor,
                },
                state === AnswerState.TRUE && {
                    borderColor: commonColor.trueBorderColor,
                    backgroundColor: commonColor.trueBgColor,
                },
            ]}
            key={text}
            onPress={() => onAnswer(text)}
            disabled={disabled}
        >
            <View
                style={[
                    styles.answerNumber,
                    { backgroundColor: choiceNumberBg },
                    state !== AnswerState.UNSET ? { backgroundColor: 'transparent' } : undefined,
                ]}
            >
                <ThemedText style={[styles.answerNumberText]}>{getState(state, number)}</ThemedText>
            </View>
            <ThemedText style={[styles.answerText]}>{text}</ThemedText>
        </TouchableOpacity>
    );
}

export default MultipleChoiceAnswer;

const styles = StyleSheet.create({
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
});
