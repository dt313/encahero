import { useEffect } from 'react';

import { Linking } from 'react-native';

import * as ExpoLinking from 'expo-linking';
import { Redirect, useRouter } from 'expo-router';

import { RootState } from '@/store/reducers';
import { useSelector } from 'react-redux';

function IndexScreen() {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    useEffect(() => {
        const handleDeepLink = ({ url }: { url: string }) => {
            const data = ExpoLinking.parse(url);
            if (data.path === 'auth/magic' && data.queryParams?.token) {
                const token = data.queryParams.token;
                console.log('Token nhận được:', token);
                // Gọi API verify token + login user
            }
        };

        Linking.addEventListener('url', handleDeepLink);

        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({ url });
        });

        return () => Linking.removeAllListeners('url');
    }, [router]);

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/(tabs)" />;
}

export default IndexScreen;
