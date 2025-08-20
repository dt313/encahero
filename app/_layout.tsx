import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import StoreProvider from '@/components/store-provider';
import ToastContainer from '@/components/toast-container';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    // FIXME :
    // TODO :
    // implement it
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StoreProvider>
                <GestureHandlerRootView>
                    <ToastContainer />
                    <BottomSheetModalProvider>
                        <Stack>
                            <Stack.Screen name="index" options={{ headerShown: false }} />
                            <Stack.Screen name="category" options={{ headerShown: false }} />
                            <Stack.Screen name="match" options={{ headerShown: false }} />
                            <Stack.Screen name="lobby" options={{ headerShown: false }} />
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </BottomSheetModalProvider>

                    <StatusBar style="auto" />
                </GestureHandlerRootView>
            </StoreProvider>
        </ThemeProvider>
    );
}
