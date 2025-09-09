import { useMemo, useState } from 'react';

import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { router } from 'expo-router';

import { addToast } from '@/store/action/toast-action';
import { LockPasswordIcon, Mail02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import fbIcon from '@/assets/images/fb-icon.png';
import ggIcon from '@/assets/images/gg-icon.png';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import Input from '@/components/input';
import TabSwitcher from '@/components/tab-swicher';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedView } from './ThemedView';

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GG_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GG_IOS_CLIENT_ID,
    scopes: ['email', 'profile'],
});

const TAB_SWITCHER = [
    {
        value: 'magic-link',
        label: 'Magic Link',
    },
    {
        value: 'password',
        label: 'Password',
    },
];

type AuthProps = {
    type: 'login' | 'register';
};

function AuthScreen({ type }: AuthProps) {
    const [tab, setTab] = useState<string>(TAB_SWITCHER[0].value);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();

    const handleChangeTabSwitch = (value: string) => {
        setTab(value);
    };

    const typeValue = useMemo(() => (type === 'register' ? 'Register' : 'Login'), [type]);

    const handleSubmit = async () => {};

    const handleGGButton = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (isSuccessResponse(response)) {
                console.log('Google Sign-In Success:', response);
                // FOR USING ON BACKEND!
                // const res = await fetch("http://192.168.100.6:5000/verify-token", {
                //   method: "POST",
                //   headers: { "Content-Type": "application/json" },
                //   body: JSON.stringify({ idToken }),
                // });
                // const data = await res.json();
                // if (data?.success) {
                //   setLoading(false);
                //   setUserInfo(data);
                // }
                // console.log("Backend response:", data);
            } else {
                console.log('Google Sign-In Failed:', response);
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        console.log('User cancelled the login flow');
                        break;
                    case statusCodes.IN_PROGRESS:
                        console.log('Sign in is in progress already');
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.log('Play services not available or outdated');
                        break;
                    default:
                        console.log('Some other error happened:', error);
                }
            } else {
                console.log('An unexpected error occurred:', error);
            }
        } finally {
        }
    };

    const handleFbButton = () => {
        dispatch(addToast({ position: 'bottom', type: 'warning' }));
    };

    // color theme
    const color = useThemeColor({}, 'text');
    const whiteColor = useThemeColor({}, 'white');
    const dividerColor = useThemeColor({}, 'dividerColor');

    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    return (
        <ThemedView style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.content}>
                    <View style={styles.title}>
                        <ThemedText type="title">
                            {typeValue} to <Text style={styles.appName}>Encahero</Text>
                        </ThemedText>
                        <HelloWave />
                    </View>
                    {/* Tab Switcher */}
                    <TabSwitcher
                        tabs={TAB_SWITCHER}
                        activeTab={tab}
                        onTabChange={handleChangeTabSwitch}
                        containerStyle={{
                            marginTop: 24,
                        }}
                    />
                    {/* input  */}

                    <View style={styles.inputContainer}>
                        <Input
                            leftIcon={<HugeiconsIcon icon={Mail02Icon} color={inputBorderColor} size={24} />}
                            label="Email"
                            value={email}
                            placeholder="example@gmail.com"
                            onChangeText={setEmail}
                        />
                        {tab === 'password' && (
                            <Input
                                leftIcon={<HugeiconsIcon icon={LockPasswordIcon} color={inputBorderColor} size={24} />}
                                label="Password"
                                value={password}
                                placeholder="Abcd123@"
                                onChangeText={setPassword}
                                isPassword
                            />
                        )}
                    </View>

                    {/* button */}
                    <Button onPress={handleSubmit}>{tab === 'password' ? typeValue : 'Send'}</Button>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
                    </View>

                    {/* Social Buttons */}
                    <View style={styles.inputContainer}>
                        <Button
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                borderWidth: 1.5,
                                borderColor: '#ceccccff',
                            }}
                            textStyle={{ color }}
                            leftIcon={<Image style={styles.socialIcon} source={ggIcon} />}
                            onPress={handleGGButton}
                        >
                            Continue with Google
                        </Button>
                        <Button
                            buttonStyle={{
                                backgroundColor: color,
                                borderWidth: 1.5,
                                borderColor: color,
                            }}
                            textStyle={{ color: whiteColor }}
                            leftIcon={<Image style={styles.socialIcon} source={fbIcon} />}
                            onPress={handleFbButton}
                        >
                            Continue with Facebook
                        </Button>
                    </View>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>
                            {type === 'register' ? 'Are you already a member? ' : 'Not a Collect member yet? '}
                        </Text>
                        <Button
                            type="link"
                            onPress={() => {
                                if (type === 'register') router.back();
                                else {
                                    router.push('/register');
                                }
                            }}
                        >
                            {type === 'register' ? 'Login' : 'Register'} Now
                        </Button>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },

    appName: {
        color: '#FF9800',
        fontWeight: 'bold',
        fontSize: 32,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    inputContainer: {
        marginBottom: 32,
        display: 'flex',
        rowGap: 16,
    },

    // divider
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 48,
    },
    dividerLine: {
        flex: 1,
        height: 2,
    },
    dividerText: {
        fontSize: 14,
        color: '#8E8E93',
        marginHorizontal: 16,
        fontWeight: '500',
    },

    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
    },

    registerContainer: {
        position: 'absolute',
        bottom: 32,
        left: 0,
        right: 0,
        height: 40, // hoặc tuỳ chỉnh
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    registerText: {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0.3,
        color: '#8E8E93',
        textAlign: 'center',
    },
});

export default AuthScreen;
