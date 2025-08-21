import { ReactNode } from 'react';

import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import { commonColor } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

export type ButtonProps = {
    type?: 'default' | 'link' | 'dangerous';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children?: ReactNode;
    onPress?: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
} & TouchableOpacityProps;

function Button({
    children,
    type = 'default',
    onPress,
    buttonStyle,
    textStyle,
    leftIcon,
    rightIcon,
    ...rest
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                type === 'default' ? styles.default : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'dangerous' ? { backgroundColor: '#fee2e2' } : undefined,
                buttonStyle,
            ]}
            onPress={onPress}
            {...rest}
        >
            {leftIcon}
            <ThemedText
                style={[
                    styles.buttonText,
                    type === 'link' ? { color: '#FF9800' } : undefined,
                    type === 'default' ? { color: '#333' } : undefined,
                    type === 'dangerous' ? { color: commonColor.failBorderColor } : undefined,

                    textStyle,
                ]}
            >
                {children}
            </ThemedText>
            {rightIcon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        borderRadius: 8,
    },
    default: {
        backgroundColor: '#FF9800',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    link: {
        backgroundColor: 'transparent',
    },
});

export default Button;
