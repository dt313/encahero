import { useEffect, useMemo, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import * as Speech from 'expo-speech';

import { RootState } from '@/store/reducers';
import { Idea01Icon, VolumeHighIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useSelector } from 'react-redux';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';
import Input from '../input';
import { Quiz } from '../random-quiz';
import { ViToEng } from './multiple-choice';

function TypingCard({ quiz, onSubmit }: { quiz: Quiz; onSubmit: () => void }) {
    const [value, setValue] = useState('');
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

    const isAutoSound = useSelector((state: RootState) => state.sound.autoSound);

    useEffect(() => {
        if (!isAutoSound) return;
        Speech.stop();
        Speech.speak(quiz.en_word);

        return () => {
            Speech.stop();
            reset();
        };
    }, [quiz, isAutoSound]);

    const speak = () => {
        Speech.stop();
        Speech.speak(quiz.en_word);
    };

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
    const reviewTagBorderColor = useThemeColor({}, 'reviewTagBorderColor');
    const reviewTagBg = useThemeColor({}, 'reviewTagBg');
    const reviewTagColor = useThemeColor({}, 'reviewTagColor');

    return (
        <View style={[styles.wrapper, { backgroundColor: mainBoxBg, shadowColor }]}>
            <ViToEng meaning={quiz.meaning} example={quiz.ex[0]} url={quiz?.image_url} type={quiz?.type} />
            <View style={styles.tools}>
                <View style={styles.toolItem}>
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
                <TouchableOpacity style={styles.toolItem} onPress={speak}>
                    <HugeiconsIcon icon={VolumeHighIcon} size={28} color={commonColor.volumeColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolItem} onPress={showAnswer}>
                    <HugeiconsIcon icon={Idea01Icon} size={28} color="#FF9800" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.toolItem} onPress={next}>
                    <HugeiconsIcon icon={Eraser01Icon} size={28} color={commonColor.failBorderColor} />
                </TouchableOpacity> */}
            </View>
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

    tools: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderRadius: 16,
        marginVertical: 24,
    },

    toolItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    type: {
        borderWidth: 1.5,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderColor: '#bdc5d1',
        color: '#333',
        backgroundColor: '#e7eaf388',
    },

    replyBox: {
        padding: 16,
        borderRadius: 12,
        rowGap: 12,
    },
});
export default TypingCard;
