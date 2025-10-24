import { useEffect, useRef, useState } from 'react';

import { Animated, Dimensions, Keyboard, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import {
    Alert02Icon,
    AlertCircleIcon,
    Cancel01Icon,
    CheckmarkCircle03Icon,
    Eraser01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { ThemedText } from './ThemedText';

const { width } = Dimensions.get('window');
type ToastProps = {
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    duration: number;
    position: 'top' | 'bottom';
    onHide: () => void;
};

// Thêm type definition ở đầu file
type KeyboardEventData = {
    endCoordinates: {
        height: number;
    };
};

function Toast({ title, message, type, duration, position, onHide }: ToastProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(position === 'top' ? -50 : 50)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e: KeyboardEventData) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        // Animate in
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto hide after duration
        const timer = setTimeout(() => {
            hideToast();
        }, duration);

        return () => {
            keyboardDidShowListener?.remove();
            keyboardDidHideListener?.remove();
            clearTimeout(timer);
        };
    }, [duration]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: position === 'top' ? -50 : 50,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                if (onHide) onHide();
            }, 0);
        });
    };

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return styles.successToast;
            case 'error':
                return styles.errorToast;
            case 'warning':
                return styles.warningToast;
            default:
                return styles.infoToast;
        }
    };

    const getIconBg = () => {
        switch (type) {
            case 'success':
                return styles.successIconBg;
            case 'error':
                return styles.errorIconBg;
            case 'warning':
                return styles.warningIconBg;
            default:
                return styles.infoIconBg;
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return CheckmarkCircle03Icon;
            case 'error':
                return Eraser01Icon;
            case 'warning':
                return Alert02Icon;
            default:
                return AlertCircleIcon;
        }
    };

    // Calculate dynamic position based on keyboard
    const getContainerStyle = () => {
        if (position === 'top') {
            return [styles.container, styles.topPosition];
        } else {
            // For bottom position, adjust based on keyboard height
            const bottomOffset =
                keyboardHeight > 0
                    ? keyboardHeight + 20 // 20px padding above keyboard
                    : Platform.OS === 'ios'
                      ? 80
                      : 40;

            return [
                styles.container,
                {
                    bottom: bottomOffset,
                    // Use transform instead of bottom for smooth animation
                    transform: [{ translateY: 0 }],
                },
            ];
        }
    };

    return (
        <View style={getContainerStyle()}>
            <Animated.View
                style={[
                    styles.toast,
                    getToastStyle(),
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <View style={[styles.iconWrap, getIconBg()]}>
                    <HugeiconsIcon icon={getIcon()} color="white" size={20} />
                </View>
                <View style={styles.textWrap}>
                    <ThemedText style={[styles.message, styles.title]} numberOfLines={3}>
                        {title}
                    </ThemedText>
                    <ThemedText style={[styles.message, styles.content]} numberOfLines={3}>
                        {message}
                    </ThemedText>
                </View>
                <TouchableOpacity
                    style={[
                        styles.iconWrap,
                        {
                            borderWidth: 1,
                            borderColor: '#c6c6c6ff',
                        },
                    ]}
                    onPress={hideToast}
                >
                    <HugeiconsIcon icon={Cancel01Icon} color="white" size={16} />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
        paddingHorizontal: 20,
    },
    topPosition: {
        top: Platform.OS === 'ios' ? 60 : 40,
    },
    toast: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 50,
        maxWidth: width - 40,
        minWidth: '90%',
        minHeight: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    message: {
        marginHorizontal: 8,
        fontSize: 14,
        textAlign: 'left',
        fontWeight: '500',
        color: '#fff',
    },
    // Toast types
    infoToast: {
        backgroundColor: '#002757',
    },
    successToast: {
        backgroundColor: '#00593e',
    },
    errorToast: {
        backgroundColor: '#561000',
    },
    warningToast: {
        backgroundColor: '#593300',
    },

    // icon background
    infoIconBg: {
        backgroundColor: '#2f86e6',
    },
    successIconBg: {
        backgroundColor: '#00976a',
    },
    errorIconBg: {
        backgroundColor: '#951f03',
    },
    warningIconBg: {
        backgroundColor: '#945801',
    },
    // Text colors
    textWrap: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    content: {
        fontSize: 14,
        color: '#dededeff',
    },

    // icon
    iconWrap: {
        borderRadius: 100,
        width: 32,
        height: 32,
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Toast;
