import { useEffect } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import * as Speech from 'expo-speech';

import { RootState } from '@/store/reducers';
import { ArrowReloadHorizontalIcon, Idea01Icon, VolumeHighIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useSelector } from 'react-redux';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';

type ActionProps = {
    isNew: boolean;
    speakWord: string;
    onFlip?: () => void;
    onShowAnswer?: () => void;
    hideFlip?: boolean;
    hideShowAnswer?: boolean;
};

function Action({ isNew, speakWord, onFlip, onShowAnswer, hideFlip = false, hideShowAnswer = true }: ActionProps) {
    const textColor = useThemeColor({}, 'text');
    const reviewTagBorderColor = useThemeColor({}, 'reviewTagBorderColor');
    const reviewTagBg = useThemeColor({}, 'reviewTagBg');
    const reviewTagColor = useThemeColor({}, 'reviewTagColor');
    const newTagBorderColor = useThemeColor({}, 'newTagBorderColor');
    const newTagBg = useThemeColor({}, 'newTagBg');
    const newTagColor = useThemeColor({}, 'newTagColor');
    const isAutoSound = useSelector((state: RootState) => state.sound.autoSound);

    useEffect(() => {
        if (!isAutoSound) return;
        Speech.stop();
        Speech.speak(speakWord);

        return () => {
            Speech.stop();
        };
    }, [speakWord, isAutoSound]);

    const speak = () => {
        Speech.stop();
        Speech.speak(speakWord);
    };
    return (
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
                <HugeiconsIcon icon={VolumeHighIcon} size={28} color={commonColor.volumeColor} />
            </TouchableOpacity>
            {!hideFlip && (
                <TouchableOpacity style={styles.toolItem} onPress={onFlip}>
                    <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={28} color={textColor} />
                </TouchableOpacity>
            )}
            {!hideShowAnswer && (
                <TouchableOpacity style={styles.toolItem} onPress={onShowAnswer}>
                    <HugeiconsIcon icon={Idea01Icon} size={28} color="#FF9800" />
                </TouchableOpacity>
            )}
        </View>
    );
}

export default Action;

const styles = StyleSheet.create({
    type: {
        borderWidth: 1.5,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        fontWeight: 500,
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
});
