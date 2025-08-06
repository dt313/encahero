import React from 'react';

import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export const HapticTab = ({ children, onPress, accessibilityState }: BottomTabBarButtonProps) => {
    const focused = accessibilityState?.selected;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(focused ? 1.2 : 1),
                },
                {
                    translateY: withSpring(focused ? -5 : 0),
                },
            ],
            opacity: withSpring(focused ? 1 : 0.7),
        };
    }, [focused]);

    return (
        <PlatformPressable onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={animatedStyle}>{children}</Animated.View>
        </PlatformPressable>
    );
};
