import { ReactNode } from 'react';

import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import { ThemedText } from './ThemedText';

export type ButtonProps = {
    type?: string;
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
                ,
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
    },
    default: {
        backgroundColor: '#FF9800',
        paddingVertical: 12,
        borderRadius: 8,
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
