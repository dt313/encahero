import { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Speech from 'expo-speech';

import { ArrowReloadHorizontalIcon, VolumeHighIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import FlipCard from 'react-native-flip-card';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';

type AnswerType = {
    title: string;
    name: 'easy' | 'medium' | 'hard';
    icon: string;
};
const anwsers: AnswerType[] = [
    {
        title: 'Easy',
        name: 'easy',
        icon: '😊',
    },

    {
        title: 'Medium',
        name: 'medium',

        icon: '🤔',
    },

    {
        title: 'Hard',
        name: 'hard',
        icon: '😡',
    },
];

function ReviewCard() {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    const [flip, setFlip] = useState(false);

    const handleFlip = () => {
        setFlip(!flip);
    };

    const speak = () => {
        Speech.stop();
        const thingToSay = 'Hello World';
        Speech.speak(thingToSay);
    };
    return (
        <View style={styles.wrapper}>
            <View style={[styles.questionBox, { backgroundColor: backgroundColor }]}>
                <View style={[styles.flip]}>
                    <FlipCard
                        flip={flip}
                        style={{
                            flex: 1,
                            height: '100%',
                            backgroundColor: backgroundColor,
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
                            <ThemedText type="title">Truth</ThemedText>
                        </View>
                        <View style={styles.card}>
                            <ThemedText type="title">Su That</ThemedText>
                        </View>
                    </FlipCard>
                </View>

                <View style={styles.tools}>
                    <View style={styles.toolItem}>
                        <ThemedText style={styles.type}>New</ThemedText>
                    </View>
                    <TouchableOpacity style={styles.toolItem} onPress={speak}>
                        <HugeiconsIcon icon={VolumeHighIcon} size={28} color={textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolItem} onPress={handleFlip}>
                        <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={28} color={textColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.replyBox, { backgroundColor: backgroundColor }]}>
                {anwsers.map((ans) => {
                    return (
                        <TouchableOpacity key={ans.title} style={styles.btn}>
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
        flex: 1,
    },

    questionBox: {
        width: '100%',
        height: '50%',
        borderRadius: 16,
        padding: 12,
        rowGap: 12,
        // Shadow iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Shadow Android
        elevation: 5,
    },

    type: {
        borderWidth: 1.5,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderColor: '#c154c9ff',
        color: '#c154c9ff',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Shadow Android
        elevation: 5,
    },

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
    },

    easy: { color: '#4CAF50', fontWeight: '600' }, // xanh lá
    medium: { color: '#FFC107', fontWeight: '600' }, // vàng cam
    hard: { color: '#F44336', fontWeight: '600' }, // đỏ
});

export default ReviewCard;
