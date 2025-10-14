import { useEffect, useMemo, useState } from 'react';

import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { router } from 'expo-router';

import { LockPasswordIcon, Mail02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import fbIcon from '@/assets/images/fb-icon.png';
import ggIcon from '@/assets/images/gg-icon.png';

import { commonColor } from '@/constants/Colors';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import Input from '@/components/input';
import TabSwitcher from '@/components/tab-swicher';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import ScreenWrapper from './screen-wrapper';

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

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

type AuthProps = {
    type: 'login' | 'register';
    onPressGGLogin: () => Promise<void>;
    onSend: (email: string) => Promise<void>;
    hideMessage: () => void;
    onSubmit: (email: string, password: string) => Promise<void>;
    infoMessage?: string;
    errorMessage?: string;
};

function AuthScreen({ type, onPressGGLogin, onSubmit, onSend, infoMessage, errorMessage, hideMessage }: AuthProps) {
    const [tab, setTab] = useState<string>(TAB_SWITCHER[0].value);
    const {
        control,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange', // validate realtime
    });

    const [loading, setLoading] = useState(false);

    const values = watch();

    useEffect(() => {
        hideMessage();
    }, [values.email, values.password, values.confirmPassword]);

    const { showErrorToast } = useToast();
    const handleChangeTabSwitch = (value: string) => {
        setTab(value);
        hideMessage();
    };

    const typeValue = useMemo(() => (type === 'register' ? 'Register' : 'Login'), [type]);

    const submit = async (data: FormValues) => {
        try {
            setLoading(true);
            // TODO: create constant for this
            if (tab === 'magic-link') {
                await onSend(data.email);
            } else {
                await onSubmit(data.email, data.password);
            }
            reset({ email: '', password: '', confirmPassword: '' });
        } catch (error) {
            showErrorToast(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFbButton = () => {
        // dispatch(addToast({ position: 'bottom', type: 'warning' }));
    };

    // color theme
    const color = useThemeColor({}, 'text');
    const whiteColor = useThemeColor({}, 'white');
    const dividerColor = useThemeColor({}, 'dividerColor');

    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    return (
        <ScreenWrapper>
            <ScrollView>
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
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Invalid email format',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        leftIcon={
                                            <HugeiconsIcon icon={Mail02Icon} color={inputBorderColor} size={24} />
                                        }
                                        label="Email"
                                        value={value}
                                        placeholder="example@gmail.com"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        errorMessage={errors.email?.message}
                                    />
                                )}
                            />

                            {tab === 'password' && (
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
                                            leftIcon={
                                                <HugeiconsIcon
                                                    icon={LockPasswordIcon}
                                                    color={inputBorderColor}
                                                    size={24}
                                                />
                                            }
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
                            )}

                            {type === 'register' && tab === 'password' && (
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    rules={{
                                        required: 'Confirm Password is required',
                                        validate: (value, formValues) =>
                                            value === formValues.password || 'Passwords do not match',
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            leftIcon={
                                                <HugeiconsIcon
                                                    icon={LockPasswordIcon}
                                                    color={inputBorderColor}
                                                    size={24}
                                                />
                                            }
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
                            )}
                            {errorMessage && (
                                <ThemedText style={[styles.message, { color: commonColor.failBorderColor }]}>
                                    {errorMessage}
                                </ThemedText>
                            )}
                            {infoMessage && (
                                <ThemedText style={[styles.message, { color: commonColor.trueBorderColor }]}>
                                    {infoMessage}
                                </ThemedText>
                            )}
                        </View>

                        {/* button */}
                        <Button onPress={handleSubmit(submit)} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color={color} />
                            ) : tab === 'password' ? (
                                typeValue
                            ) : (
                                'Send'
                            )}
                        </Button>

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
                                onPress={onPressGGLogin}
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
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>
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
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
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
        rowGap: 8,
    },

    // infoMessage
    message: {
        fontWeight: 500,
        textAlign: 'center',
        fontSize: 15,
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
        fontWeight: 500,
    },

    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
    },

    footerContainer: {
        marginBottom: 32,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    footerText: {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0.3,
        color: '#8E8E93',
        textAlign: 'center',
    },
});

export default AuthScreen;
