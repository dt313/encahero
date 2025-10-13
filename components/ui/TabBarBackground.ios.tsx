import { StyleSheet } from 'react-native';

import { BlurView } from 'expo-blur';

import { useThemeSwitcher } from '@/context/custom-theme-provider';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function BlurTabBarBackground() {
    const { mode } = useThemeSwitcher();
    return (
        <BlurView
            // System chrome material automatically adapts to the system's theme
            // and matches the native tab bar appearance on iOS.
            tint={mode === 'dark' ? 'dark' : 'light'}
            intensity={100}
            style={StyleSheet.absoluteFill}
        />
    );
}

export function useBottomTabOverflow() {
    return useBottomTabBarHeight();
}
