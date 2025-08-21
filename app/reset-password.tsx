import React, { useState } from 'react';

import { Alert, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { LockPasswordIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import BackIcon from '@/components/back-icon';
import Button from '@/components/button';
import Input from '@/components/input';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    const router = useRouter();

    const handleBack = () => router.back();

    const handleReset = () => {
        setError('');

        if (!password || !confirmPassword) {
            setError('Please fill in both fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Gọi API reset password ở đây
        Alert.alert('Success', 'Your password has been reset!');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackIcon onPress={handleBack} />
                <ThemedText type="title" style={styles.title}>
                    Reset Your Password
                </ThemedText>
            </View>

            <View style={[styles.inputWrap]}>
                <Input
                    leftIcon={<HugeiconsIcon icon={LockPasswordIcon} color={inputBorderColor} size={24} />}
                    label="New Password"
                    placeholder="Enter your new password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={[styles.inputWrap]}>
                <Input
                    leftIcon={<HugeiconsIcon icon={LockPasswordIcon} color={inputBorderColor} size={24} />}
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {error ? (
                <View style={styles.errorBox}>
                    <ThemedText style={styles.errorText}>{error}</ThemedText>
                </View>
            ) : null}

            <Button onPress={handleReset} buttonStyle={{ borderRadius: 100, marginTop: 12 }}>
                Reset Password
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },

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
