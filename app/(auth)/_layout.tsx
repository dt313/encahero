import { useEffect } from 'react';

import { Linking } from 'react-native';

import { Stack, useRouter } from 'expo-router';

import { AppDispatch } from '@/store';
import { magicAuth } from '@/store/action/auth-action';
import { useDispatch } from 'react-redux';

import useToast from '@/hooks/useToast';

function AuthLayout() {
    const dispatch = useDispatch<AppDispatch>();

    const { showErrorToast } = useToast();
    const router = useRouter();
    const handleUrl = async (url: string) => {
        // url: encahero://auth/login?jwt=xxx
        try {
            const tokenMatch = url.match(/jwt=([^&]+)/);
            if (tokenMatch) {
                const token = tokenMatch[1];
                if (token) {
                    await dispatch(magicAuth(token));
                    router.replace('/');
                }
            }
        } catch (error) {
            showErrorToast(error);
        }
    };

    useEffect(() => {
        // 1. When app open from url
        Linking.getInitialURL().then((url) => {
            if (url) {
                handleUrl(url);
            }
        });

        // 2. When app run on background
        const subscription = Linking.addEventListener('url', ({ url }) => {
            handleUrl(url);
        });

        return () => subscription.remove();
    }, []);
    return (
        <Stack>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}

export default AuthLayout;
