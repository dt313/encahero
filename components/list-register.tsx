import React, { useState } from 'react';

import { Platform, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { Picker } from '@react-native-picker/picker';

import { commonColor } from '@/constants/Colors';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

export type ListRegisterType = {
    title: string;
    description?: string;
    goal?: number;
    onConfirm: (goal: number) => void;
    onClose?: () => void;
    isRegistered?: boolean;
    id: number;
};

export default function ListRegister({
    title,
    description,
    onConfirm,
    onClose = () => {},
    isRegistered = false,
    goal = 100,
    id,
}: ListRegisterType) {
    const [taskCount, setTaskCount] = useState(goal);

    const router = useRouter();

    const lighterText = useThemeColor({}, 'lighterText');

    const directLinkHandler = () => {
        router.push(`/cards/${id}`);
        onClose();
    };

    const black = useThemeColor({}, 'black');
    const androidPickerBg = useThemeColor({}, 'androidPickerBg');
    return (
        <View style={styles.container}>
            <ThemedText type="subtitle">{title}</ThemedText>
            {description && (
                <ThemedText
                    style={{
                        marginTop: 8,
                        textAlign: 'center',
                        fontWeight: 500,
                        color: lighterText,
                    }}
                >
                    {description}
                </ThemedText>
            )}

            <Picker
                selectedValue={taskCount}
                onValueChange={(value) => setTaskCount(value)}
                style={{
                    width: '100%',
                    backgroundColor: Platform.OS === 'android' ? androidPickerBg : undefined,
                    marginVertical: Platform.OS === 'android' ? 24 : undefined,
                }}
                dropdownIconColor={black}
                dropdownIconRippleColor={commonColor.primaryColor}
                mode="dropdown"
            >
                {[20, 50, 100, 150, 200, 300, 350, 400, 450, 500].map((num) => (
                    <Picker.Item
                        key={num}
                        label={`${num} tasks per day`}
                        value={num}
                        color={black}
                        style={{
                            backgroundColor: androidPickerBg,
                            margin: 0,
                        }}
                    />
                ))}
            </Picker>

            <View
                style={{
                    width: '100%',
                    rowGap: 12,
                }}
            >
                <Button onPress={() => onConfirm(taskCount)}>{isRegistered ? 'Change' : 'Register'}</Button>
                {!isRegistered && (
                    <Button type="link" onPress={directLinkHandler}>
                        View all cards →
                    </Button>
                )}
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
