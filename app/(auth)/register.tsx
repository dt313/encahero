import { useRouter } from 'expo-router';

import GoogleSignin from '@/config/gg-signin';
import { login } from '@/store/action/auth-action';
import { isSuccessResponse } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';

import AuthScreen from '@/components/auth-screen';

import useToast from '@/hooks/useToast';

import { storage } from '@/utils';

import { authServices } from '@/services';

export default function Register() {
    const { showErrorToast } = useToast();
    const dispatch = useDispatch();
    const router = useRouter();

    const handlePressGGRegister = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (!isSuccessResponse(response)) {
                throw new Error('Google Sign in Failed');
            }

            const idToken = response.data.idToken;
            let res = null;
            if (!idToken) {
                throw new Error('No idToken found in Google Sign-In response');
            }
            res = await authServices.ggRegister(idToken);
            const { accessToken, refreshToken, user } = res.data;

            if (!accessToken || !refreshToken || !user) {
                throw new Error('Invalid login response');
            }
            // save token in storage
            if (!!accessToken && !!refreshToken && !!user) {
                await storage.setAccessToken(accessToken);
                await storage.setRefreshToken(refreshToken);
                await storage.setUser(user);
                // reducer
                dispatch(login(user));
                router.replace('/');
            }
        } catch (error) {
            showErrorToast(error);
        } finally {
        }
    };
    return <AuthScreen type={'register'} onPressGGLogin={handlePressGGRegister} />;
}
