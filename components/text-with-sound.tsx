import { useEffect } from 'react';

import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import * as Speech from 'expo-speech';

import Ionicons from '@expo/vector-icons/Ionicons';

import { commonColor } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

export const SoundButton = ({
    text = '',
    color = commonColor.volumeColor,
    size = 24,
}: {
    text: string;
    color?: string;
    size?: number;
}) => {
    useEffect(() => {
        Speech.stop();
        Speech.speak(text);
        return () => {
            Speech.stop();
        };
    }, [text]);
    const speak = () => {
        Speech.stop();
        Speech.speak(text);
    };

    return (
        <TouchableOpacity style={{ marginLeft: 8 }} onPress={speak}>
            <Ionicons name="volume-high-outline" size={size} color={color} />
        </TouchableOpacity>
    );
};

function TextWithSound({
    text = 'Hello World',
    textStyle,
    containerStyle,
    textType,
}: {
    text: string;
    textType: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}) {
    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                containerStyle,
            ]}
        >
            <ThemedText style={[textStyle]} type={textType}>
                {text}
            </ThemedText>
            <SoundButton text={text} />
        </View>
    );
}

export default TextWithSound;
