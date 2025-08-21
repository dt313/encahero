import React, { useState } from 'react';

import { Alert, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { Mail01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import BackIcon from '@/components/back-icon';
import Button from '@/components/button';
import Input from '@/components/input';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function MailOTP() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    const router = useRouter();

    const handleSendCode = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
        // Gọi API gửi code reset password tới email
        setCodeSent(true);
    };

    const handleConfirm = () => {
        Alert.alert('Success', `${code}`);
        router.push('/reset-password');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackIcon onPress={handleBack} />
                <ThemedText type="title" style={styles.title}>
                    Forgot Password
                </ThemedText>
            </View>

            {/* Nhập Email */}
            <View style={styles.inputWrap}>
                <Input
                    leftIcon={<HugeiconsIcon icon={Mail01FreeIcons} color={inputBorderColor} size={24} />}
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    editable={!codeSent}
                />
            </View>

            {codeSent && (
                <View style={styles.inputWrap}>
                    <Input
                        placeholder="Enter your OPT code"
                        keyboardType="number-pad"
                        value={code}
                        onChangeText={setCode}
                    />
                </View>
            )}

            {codeSent ? (
                <Button onPress={handleConfirm} buttonStyle={{ borderRadius: 100 }}>
                    Confirm Code
                </Button>
            ) : (
                <Button onPress={handleSendCode} buttonStyle={{ borderRadius: 100 }}>
                    Send Code
                </Button>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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

    input: {
        flex: 1,
        height: '100%',
        paddingLeft: 12,
    },
});
