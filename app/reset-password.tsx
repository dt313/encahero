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
                Alert.alert('Error', 'You have no privilege');
                return;
            }
            const res = await authServices.resetPassword(values.confirmPassword, tokenStr);

            if (res) {
                showSuccessToast('Your password has been reset! Please login again with your new password.');
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
                <HeaderWithBack title="Reset Password" />

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
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                leftIcon={<HugeiconsIcon icon={LockPasswordIcon} color={inputBorderColor} size={24} />}
                                label="Password"
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
                            required: 'Confirm Password is required',
                            validate: (value, formValues) => value === formValues.password || 'Passwords do not match',
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                leftIcon={<HugeiconsIcon icon={LockPasswordIcon} color={inputBorderColor} size={24} />}
                                label="Confirm Password"
                                value={value}
                                placeholder="Re-enter password"
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
                    Reset Password
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
