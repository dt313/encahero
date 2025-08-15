import { useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Eraser01Icon, Idea01Icon, VolumeHighIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';
import Input from '../input';
import { ViToEng } from './multiple-choice';

function TypingCard() {
    const [value, setValue] = useState('');
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    const speak = () => {};
    const showAnswer = () => {};
    const next = () => {};

    const handleSubmit = (text: string) => {
        console.log(text);
    };

    return (
        <View style={[styles.wrapper, { backgroundColor: backgroundColor }]}>
            <ViToEng />
            <View style={styles.tools}>
                <View style={styles.toolItem}>
                    <ThemedText style={styles.type}>New</ThemedText>
                </View>
                <TouchableOpacity style={styles.toolItem} onPress={speak}>
                    <HugeiconsIcon icon={VolumeHighIcon} size={28} color={commonColor.volumeColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolItem} onPress={showAnswer}>
                    <HugeiconsIcon icon={Idea01Icon} size={28} color="#FF9800" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolItem} onPress={next}>
                    <HugeiconsIcon icon={Eraser01Icon} size={28} color={commonColor.failBorderColor} />
                </TouchableOpacity>
            </View>
            <Input
                placeholder="Type your answer here ..."
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
        borderColor: '#c154c9ff',
        color: '#c154c9ff',
    },

    replyBox: {
        padding: 16,
        borderRadius: 12,
        rowGap: 12,
    },
});
export default TypingCard;
