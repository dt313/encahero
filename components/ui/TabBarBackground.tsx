import { StyleSheet, View } from 'react-native';

import { useThemeSwitcher } from '@/context/custom-theme-provider';

export default function TabBarBackground() {
    const { mode } = useThemeSwitcher();

    return (
        <View
            style={[
                StyleSheet.absoluteFill,
                {
                    backgroundColor: mode === 'dark' ? '#0d0d0d' : '#ffffff',
                    opacity: 0.95, // thêm chút mờ nhẹ để nhìn mềm hơn
                },
            ]}
        />
    );
}
export function useBottomTabOverflow() {
    return 0;
}
