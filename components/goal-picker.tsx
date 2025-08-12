import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

export default function GoalPickerBottomSheet({
    title,
    descriprion,
    onConfirm,
}: {
    title: string;
    descriprion?: string;
    onConfirm: (goal: number) => void;
}) {
    const [goal, setGoal] = useState(5); // mặc định 5 mục tiêu

    const textColor = useThemeColor({}, 'text');
    const background = useThemeColor({}, 'background');
    const lighterText = useThemeColor({}, 'lighterText');
    return (
        <View style={styles.container}>
            <ThemedText type="title">{title}</ThemedText>
            {descriprion && (
                <ThemedText
                    style={{
                        marginTop: 8,
                        textAlign: 'center',
                        fontWeight: 500,
                        color: lighterText,
                    }}
                >
                    {descriprion}
                </ThemedText>
            )}

            <Picker
                selectedValue={goal}
                onValueChange={(value) => setGoal(value)}
                style={{
                    width: '100%',
                    backgroundColor: background, // đổi nền cả picker
                    color: textColor,
                }}
                dropdownIconColor={textColor}
            >
                {[20, 50, 100, 150, 200, 300, 350, 400, 450, 500].map((num) => (
                    <Picker.Item
                        key={num}
                        label={`${num} tasks per day`}
                        value={num}
                        style={{
                            // backgroundColor: background,
                            color: '#333',
                        }}
                    />
                ))}
            </Picker>

            <View
                style={{
                    width: '100%',
                }}
            >
                <Button onPress={() => onConfirm(goal)}>Confirm</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
    },
});
