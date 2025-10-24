import { useState } from 'react';

import { useRouter } from 'expo-router';

import GoogleSignin from '@/config/gg-signin';
import { AppDispatch } from '@/store';
import { epAuth, socialAuthAsync } from '@/store/action/auth-action';
import { isSuccessResponse } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';

import AuthScreen from '@/components/auth-screen';

import useToast from '@/hooks/useToast';

import { getErrorMessage } from '@/utils';

import { mailService } from '@/services';

export default function Register() {
    const { showErrorToast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const router = useRouter();

    const handlePressGGRegister = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (!isSuccessResponse(response)) {
                throw new Error('Đang xảy ra lỗi trong quá trình đăng ký với Google. Vui lòng thử lại.');
            }

            const idToken = response.data.idToken;
            if (!idToken) {
                throw new Error('Không tìm thấy idToken trong phản hồi đăng ký Google');
            }
            await dispatch(socialAuthAsync(idToken, true));
            router.replace('/');
        } catch (error) {
            showErrorToast(error);
        }
    };

    const handleSubmit = async (email: string, password: string) => {
        try {
            await dispatch(epAuth(email, password, true));
            router.replace('/');
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        }
    };

    const handleSendMagicLink = async (email: string) => {
        try {
            const res = await mailService.sendRegisterMagicLink(email);
            if (res.data === true) {
                setInfoMessage('Magic link đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.');
            }
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        }
    };
    const hideMessage = () => {
        if (infoMessage) setInfoMessage('');
        if (errorMessage) setErrorMessage('');
    };
    return (
        <AuthScreen
            type={'register'}
            onPressGGLogin={handlePressGGRegister}
            onSubmit={handleSubmit}
            onSend={handleSendMagicLink}
            infoMessage={infoMessage}
            errorMessage={errorMessage}
            hideMessage={hideMessage}
        />
    );
}
