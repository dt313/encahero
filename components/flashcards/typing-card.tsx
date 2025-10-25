import { useMemo, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import type { Quiz } from '@/types/quiz';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import Input from '../input';
import Action from './action';
import ViToEng from './vi2en';

function TypingCard({ quiz, onSubmit }: { quiz: Quiz; onSubmit: () => void }) {
    const [value, setValue] = useState('');
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

    const showAnswer = () => {
        setIsShowAnswer(true);
        setValue('');
    };

    const handleSubmit = (text: string) => {
        const correct = text.trim().toLowerCase() === quiz.en_word.toLowerCase();
        setIsCorrect(correct);

        if (correct) {
            setTimeout(() => {
                onSubmit();
                setValue('');
                setIsCorrect(null);
                setIsShowAnswer(false);
            }, 1000);
        }
    };

    const borderColor = useMemo(() => {
        if (isCorrect === true) return commonColor.trueBorderColor;
        if (isShowAnswer) return '#FF9800';
        if (isCorrect === false) return commonColor.failBorderColor;
        return undefined;
    }, [isCorrect, isShowAnswer]);

    const reset = () => {
        setValue('');
        setIsCorrect(null);
        setIsShowAnswer(false);
    };

    const mainBoxBg = useThemeColor({}, 'mainBoxBg');
    const shadowColor = useThemeColor({}, 'shadowColor');

    return (
        <View style={[styles.wrapper, { backgroundColor: mainBoxBg, shadowColor }]}>
            <ViToEng meaning={quiz.meaning} example={quiz.ex[0]} url={quiz?.image_url} type={quiz?.type} />
            <Action
                speakWord={quiz.en_word}
                isNew={false}
                onShowAnswer={showAnswer}
                hideFlip={true}
                hideShowAnswer={false}
            />
            <Input
                borderColor={borderColor ?? undefined}
                placeholder={isShowAnswer ? `Hãy nhập lại : ${quiz.en_word}` : 'Type your answer here ...'}
                editable={isCorrect !== true}
                value={value}
                onChangeText={setValue}
                onSubmitEditing={(e) => {
                    const text = e.nativeEvent.text;
                    handleSubmit(text);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        rowGap: 12,
        padding: 16,
        borderRadius: 12,

        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,

        // Shadow Android
        elevation: 1,
    },

    replyBox: {
        padding: 16,
        borderRadius: 12,
        rowGap: 12,
    },
});
export default TypingCard;
