import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { RootState } from '@/store/reducers';
import { Mail01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useSelector } from 'react-redux';

import { commonColor } from '@/constants/Colors';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import HeaderWithBack from '@/components/header-with-back';
import Input from '@/components/input';
import SafeArea from '@/components/safe-area';
import ScreenWrapper from '@/components/screen-wrapper';

import { useThemeColor } from '@/hooks/useThemeColor';

import { getErrorMessage } from '@/utils';

import { authServices, mailService } from '@/services';

export default function MailOTP() {
    const user = useSelector((state: RootState) => state.auth.user);

    const [email, setEmail] = useState(user.email || '');
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [resendCountdown, setResendCountdown] = useState(0); // thời gian còn lại
    const [sending, setSending] = useState(false); // đang gửi lại
    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    const router = useRouter();

    const handleSendCode = async () => {
        if (!email) {
            Alert.alert('Error', 'Hãy nhập email của bạn');
            return;
        }
        setSending(true);
        setErrorText('');
        try {
            const res = await mailService.sendResetPasswordOTP(email);
            if (res) {
                setCodeSent(true);
                setIsSuccess(true);
                setResendCountdown(60);
            }
        } catch (error) {
            const msg = getErrorMessage(error, 'Lỗi khi gửi lại OTP');
            setErrorText(msg);
        } finally {
            setSending(false);
        }
    };

    const handleConfirm = async () => {
        if (!email || !code) {
            Alert.alert('Error', 'Hãy nhập đầy đủ thông tin');
            return;
        }
        setIsSuccess(false);
        try {
            const res = await authServices.verifyOTP(email, Number(code));
            if (res && res?.resetToken) {
                router.push(`/reset-password?token=${res?.resetToken}`);
            } else {
                throw new Error('Error in response');
            }
        } catch (error) {
            const msg = getErrorMessage(error, 'Lỗi khi xác thực mã OTP');
            setErrorText(msg);
        }
    };

    const handleChangeInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (text: string) => {
        setter(text);
        setErrorText('');
    };

    useEffect(() => {
        if (resendCountdown <= 0) return;

        const timer = setTimeout(() => {
            setResendCountdown(resendCountdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [resendCountdown]);

    const handleResend = async () => {
        if (!email) {
            Alert.alert('Error', 'Hãy nhập email của bạn');
            return;
        }
        if (resendCountdown > 0 || sending) return; // đang countdown hoặc đang gửi

        setSending(true);
        setErrorText('');
        try {
            const res = await mailService.sendResetPasswordOTP(email);
            if (res) {
                setCodeSent(true);
                setIsSuccess(true);
                setCode('');
                setResendCountdown(60); // 60s mới cho resend tiếp
            }
        } catch (error) {
            const msg = getErrorMessage(error, 'Lỗi khi gửi lại OTP');
            setErrorText(msg);
        } finally {
            setSending(false);
        }
    };

    return (
        <ScreenWrapper>
            <SafeArea style={styles.container}>
                <HeaderWithBack title="Xác thực mail" />
                <View style={{ paddingHorizontal: 16, marginVertical: 12 }}>
                    <ThemedText style={{ textAlign: 'center', fontSize: 16, marginBottom: 12 }}>
                        Vui lòng nhập thông tin bên dưới để xác thực email và đặt lại mật khẩu.
                    </ThemedText>
                </View>

                <View style={styles.inputWrap}>
                    <Input
                        leftIcon={<HugeiconsIcon icon={Mail01FreeIcons} color={inputBorderColor} size={24} />}
                        label="Email"
                        placeholder="Nhập email của bạn"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={handleChangeInput(setEmail)}
                        editable={!codeSent}
                    />
                </View>

                {codeSent && (
                    <View style={styles.inputWrap}>
                        <Input
                            label="Mã xác thực"
                            placeholder="Nhập mã xác thực"
                            keyboardType="number-pad"
                            value={code}
                            onChangeText={handleChangeInput(setCode)}
                        />
                    </View>
                )}

                {isSuccess && (
                    <View style={{ paddingHorizontal: 16, marginVertical: 12 }}>
                        <ThemedText
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                marginBottom: 12,
                                color: commonColor.trueBorderColor,
                            }}
                        >
                            Mã xác thực đã được gửi — hãy kiểm tra hộp thư email nhé!
                        </ThemedText>
                    </View>
                )}

                {errorText && (
                    <View style={{ paddingHorizontal: 16, marginVertical: 12 }}>
                        <ThemedText
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                marginBottom: 12,
                                color: commonColor.failBorderColor,
                            }}
                        >
                            {errorText}
                        </ThemedText>
                    </View>
                )}

                {codeSent ? (
                    <View>
                        <Button
                            type={resendCountdown > 0 ? 'disable' : 'link'}
                            onPress={handleResend}
                            disabled={resendCountdown > 0}
                            buttonStyle={{ borderRadius: 100, marginTop: 12, marginBottom: 12 }}
                        >
                            {resendCountdown > 0 ? (
                                `Gửi lại mã (${resendCountdown}s)`
                            ) : sending ? (
                                <ActivityIndicator size="small" color="#333" />
                            ) : (
                                'Gửi lại mã'
                            )}
                        </Button>
                        <Button onPress={handleConfirm} buttonStyle={{ borderRadius: 100, marginTop: 12 }}>
                            Xác nhận mã
                        </Button>
                    </View>
                ) : (
                    <Button onPress={handleSendCode} buttonStyle={{ borderRadius: 100, marginTop: 12 }}>
                        {sending ? <ActivityIndicator size="small" color="#333" /> : 'Nhận mã'}
                    </Button>
                )}
            </SafeArea>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },

    inputWrap: {
        marginBottom: 12,
    },

    input: {
        flex: 1,
        height: '100%',
        paddingLeft: 12,
    },
});
