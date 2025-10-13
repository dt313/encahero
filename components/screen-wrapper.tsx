import { ReactNode } from 'react';

import { ViewStyle } from 'react-native';

import { ThemedView } from './ThemedView';

function ScreenWrapper({ children, style, ...rest }: { children: ReactNode; style?: ViewStyle }) {
    return (
        <ThemedView style={{ flex: 1, ...style }} {...rest}>
            {children}
        </ThemedView>
    );
}

export default ScreenWrapper;
