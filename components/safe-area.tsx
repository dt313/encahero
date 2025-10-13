import { ReactNode } from 'react';

import { ViewStyle } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

function SafeArea({ children, style, ...rest }: { children: ReactNode; style?: ViewStyle }) {
    return (
        <SafeAreaView style={style} edges={['top']} {...rest}>
            {children}
        </SafeAreaView>
    );
}

export default SafeArea;
