import React, { useState } from 'react';

import { Alert, StyleSheet, View } from 'react-native';

import { LockPasswordIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import HeaderWithBack from '@/components/header-with-back';
import Input from '@/components/input';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

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
            <HeaderWithBack title="Reset Password" />

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
