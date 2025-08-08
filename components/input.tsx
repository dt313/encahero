import { useState } from 'react';

import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

import { ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColors } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

type InputProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    isPassword?: boolean;
} & TextInputProps;

function Input({ label, value, onChangeText, isPassword = false, ...rest }: InputProps) {
    const colors = useThemeColors();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View>
            {label && <ThemedText style={styles.label}>{label}</ThemedText>}
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.authInputBackground,
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
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                >
                    <HugeiconsIcon icon={showPassword ? ViewIcon : ViewOffSlashIcon} size={24} color={colors.text} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        marginBottom: 4,
        fontWeight: '500',
        color: '#8b8b8bff',
        letterSpacing: 0.3,
        fontSize: 14,
    },
    input: {
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: 500,
        position: 'relative',
    },

    icon: {
        position: 'absolute',
        right: 12,
        top: '70%',
        transform: [{ translateY: -12 }],
    },
});

export default Input;
