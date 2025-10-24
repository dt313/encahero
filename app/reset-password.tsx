import React, { useState } from 'react';

import { Alert, StyleSheet, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppDispatch } from '@/store';
import { logoutAsync } from '@/store/action/auth-action';
import { LockPasswordIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import HeaderWithBack from '@/components/header-with-back';
import Input from '@/components/input';
import SafeArea from '@/components/safe-area';
import ScreenWrapper from '@/components/screen-wrapper';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { getErrorMessage } from '@/utils';

import { authServices } from '@/services';

export default function ResetPassword() {
    const [error, setError] = useState('');
    const { showSuccessToast } = useToast();
    const { token } = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<{ password: string; confirmPassword: string }>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange', // validate realtime
    });

    const values = watch();
    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    const handleReset = async () => {
        try {
            const tokenStr = Array.isArray(token) ? token[0] : token;
            if (!tokenStr) {
                Alert.alert('Error', 'Token không hợp lệ . Vui lòng thử lại.');
                return;
            }
            const res = await authServices.resetPassword(values.confirmPassword, tokenStr);

            if (res) {
                showSuccessToast('Mật khẩu của bạn đã được đặt lại! Vui lòng đăng nhập lại bằng mật khẩu mới.');
                reset({ password: '', confirmPassword: '' });
                dispatch(logoutAsync());
                router.replace('/login');
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            setError(msg);
        }
    };

    return (
        <ScreenWrapper>
            <SafeArea style={styles.container}>
                <HeaderWithBack title="Đặt lại mật khẩu" />

                <View style={{ paddingHorizontal: 16, marginVertical: 12 }}>
                    <ThemedText style={{ textAlign: 'center', fontSize: 16, marginBottom: 12 }}>
                        Nhập mật khẩu mới để hoàn tất quá trình đặt lại mật khẩu.
                    </ThemedText>
                </View>

                <View style={[styles.inputWrap]}>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Mật khẩu là bắt buộc',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu phải có ít nhất 6 ký tự',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                leftIcon={<HugeiconsIcon icon={LockPasswordIcon} color={inputBorderColor} size={24} />}
                                label="Mật khẩu"
                                value={value}
                                placeholder="Abcd123@"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                isPassword
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                </View>

                <View style={[styles.inputWrap]}>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: 'Xác nhận mật khẩu là bắt buộc',
                            validate: (value, formValues) => value === formValues.password || 'Mật khẩu không khớp',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                leftIcon={<HugeiconsIcon icon={LockPasswordIcon} color={inputBorderColor} size={24} />}
                                label="Xác nhận mật khẩu"
                                value={value}
                                placeholder="Nhập lại mật khẩu"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                isPassword
                                errorMessage={errors.confirmPassword?.message}
                            />
                        )}
                    />
                </View>

                {error ? (
                    <View style={styles.errorBox}>
                        <ThemedText style={styles.errorText}>{error}</ThemedText>
                    </View>
                ) : null}

                <Button onPress={handleSubmit(handleReset)} buttonStyle={{ borderRadius: 100, marginTop: 12 }}>
                    Đặt lại mật khẩu
                </Button>
            </SafeArea>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },

    inputWrap: {
        marginBottom: 12,
    },

    errorBox: {
        marginBottom: 12,
    },
    errorText: {
        color: 'red',
    },
});
