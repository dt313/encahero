import { ReactNode, useState } from 'react';

import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

import { ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { commonColor } from '@/constants/Colors';

import { useThemeColor, useThemeColors } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

type InputProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    isPassword?: boolean;
    leftIcon?: ReactNode;
    errorMessage?: string | undefined;
} & TextInputProps;

function Input({
    label,
    leftIcon = false,
    value,
    errorMessage,
    onChangeText,
    isPassword = false,
    ...rest
}: InputProps) {
    const colors = useThemeColors();
    const [showPassword, setShowPassword] = useState(false);
    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    return (
        <View>
            {label && <ThemedText style={styles.label}>{label}</ThemedText>}
            <View style={[styles.inputWrap, { borderColor: inputBorderColor }]}>
                {leftIcon}
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: colors.black,
                        },
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={isPassword && !showPassword}
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                        <HugeiconsIcon
                            icon={showPassword ? ViewIcon : ViewOffSlashIcon}
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {errorMessage && (
                <ThemedText
                    style={{
                        color: commonColor.failBorderColor,
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: 'center',
                        marginTop: 4,
                    }}
                >
                    {errorMessage}
                </ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 4,
        fontWeight: 500,
        color: '#8b8b8bff',
        letterSpacing: 0.3,
        fontSize: 14,
    },

    inputWrap: {
        flexDirection: 'row',
        height: 52,
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 40,
        position: 'relative',
    },

    input: {
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: 500,
        position: 'relative',
    },
});

export default Input;
