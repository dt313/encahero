import { useEffect, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Speech from 'expo-speech';

import { RootState } from '@/store/reducers';
import { Quiz } from '@/types/quiz';
import { ArrowReloadHorizontalIcon, VolumeHighIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import FlipCard from 'react-native-flip-card';
import { useSelector } from 'react-redux';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';

type AnswerType = {
    title: string;
    name: 'E' | 'M' | 'H';
    icon: string;
};
const answers: AnswerType[] = [
    {
        title: 'Dễ',
        name: 'E',
        icon: '😊',
    },

    {
        title: 'Trung bình',
        name: 'M',

        icon: '🤔',
    },

    {
        title: 'Khó',
        name: 'H',
        icon: '😡',
    },
];

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
    const textColor = useThemeColor({}, 'text');
    const reviewTagBorderColor = useThemeColor({}, 'reviewTagBorderColor');
    const reviewTagBg = useThemeColor({}, 'reviewTagBg');
    const reviewTagColor = useThemeColor({}, 'reviewTagColor');
    const newTagBorderColor = useThemeColor({}, 'newTagBorderColor');
    const newTagBg = useThemeColor({}, 'newTagBg');
    const newTagColor = useThemeColor({}, 'newTagColor');

    const [flip, setFlip] = useState(false);
    const isAutoSound = useSelector((state: RootState) => state.sound.autoSound);

    const handleFlip = () => {
        setFlip(!flip);
    };

    const handleSubmit = (name: 'E' | 'M' | 'H') => {
        setTimeout(() => {
            onSubmit(name);
        }, 1000);
    };

    useEffect(() => {
        if (!isAutoSound) return;
        Speech.stop();
        Speech.speak(quiz.en_word);

        return () => {
            Speech.stop();
        };
    }, [quiz, isAutoSound]);

    const speak = () => {
        Speech.stop();
        Speech.speak(quiz.en_word);
    };
    return (
        <View style={[styles.wrapper]}>
            <View style={[styles.questionBox, { backgroundColor: mainBoxBg, shadowColor }]}>
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

                <View style={styles.tools}>
                    <View style={styles.toolItem}>
                        <ThemedText
                            style={[
                                styles.type,
                                isNew
                                    ? {
                                          borderColor: newTagBorderColor,
                                          color: newTagColor,
                                          backgroundColor: newTagBg,
                                      }
                                    : {
                                          borderColor: reviewTagBorderColor,
                                          color: reviewTagColor,
                                          backgroundColor: reviewTagBg,
                                      },
                            ]}
                        >
                            {isNew ? 'Từ mới' : 'Ôn tập'}
                        </ThemedText>
                    </View>
                    <TouchableOpacity style={styles.toolItem} onPress={speak}>
                        <HugeiconsIcon icon={VolumeHighIcon} size={28} color={textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolItem} onPress={handleFlip}>
                        <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={28} color={textColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.replyBox, { backgroundColor: mainBoxBg, shadowColor }]}>
                {answers.map((ans: AnswerType) => {
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

    type: {
        borderWidth: 1.5,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        fontWeight: 500,
    },

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
    tools: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderRadius: 16,
    },

    toolItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
