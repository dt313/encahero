import { ReactNode } from 'react';

import { Alert, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import { commonColor } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

export type ButtonProps = {
    type?: 'default' | 'link' | 'dangerous' | 'disable';
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
    const handlePress = () => {
        if (type === 'disable') {
            Alert.alert('Disable Button', 'You cannot press disable button');
            return;
        }
        if (onPress) onPress();
    };
    return (
        <TouchableOpacity
            style={[
                styles.button,
                type === 'default' ? styles.default : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'dangerous' ? { backgroundColor: '#fee2e2' } : undefined,
                type === 'disable' ? { backgroundColor: '#5c5c5c77' } : undefined,
                buttonStyle,
            ]}
            onPress={handlePress}
            {...rest}
        >
            {leftIcon}
            <ThemedText
                style={[
                    styles.buttonText,
                    type === 'link' ? { color: '#FF9800' } : undefined,
                    type === 'default' ? { color: '#333' } : undefined,
                    type === 'dangerous' ? { color: commonColor.failBorderColor } : undefined,
                    type === 'disable' ? { color: '#818181' } : undefined,

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
        paddingVertical: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
    },
});

export default Button;
