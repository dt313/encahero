import { useRouter } from 'expo-router';

import GoogleSignin from '@/config/gg-signin';
import { AppDispatch } from '@/store';
import { socialLoginAsync } from '@/store/action/auth-action';
import { isSuccessResponse } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';

import AuthScreen from '@/components/auth-screen';

import useToast from '@/hooks/useToast';

export default function Login() {
    const { showErrorToast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handlePressGGLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (!isSuccessResponse(response)) {
                throw new Error('Google Sign in Failed');
            }

            const idToken = response.data.idToken;
            if (!idToken) {
                throw new Error('No idToken found in Google Sign-In response');
            }
            await dispatch(socialLoginAsync(idToken));
            router.replace('/');
        } catch (error) {
            showErrorToast(error);
        } finally {
        }
    };
    return <AuthScreen type={'login'} onPressGGLogin={handlePressGGLogin} />;
}
