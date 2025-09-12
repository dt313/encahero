import { useEffect, useState } from 'react';

import { Redirect } from 'expo-router';

import { AppDispatch } from '@/store';
import { initializeAuth } from '@/store/action/auth-action';
import { RootState } from '@/store/reducers';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';

function IndexScreen() {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const init = () => {
            dispatch(initializeAuth()).finally(() => setReady(true));
        };
        init();
    }, [dispatch]);

    if (!ready) return <ThemedText>Loading</ThemedText>;

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/(tabs)" />;
}

export default IndexScreen;
