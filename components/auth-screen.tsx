import { useMemo, useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import fbIcon from '@/assets/images/fb-icon.png';
import ggIcon from '@/assets/images/gg-icon.png';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import Input from '@/components/input';
import TabSwitcher from '@/components/tab-swicher';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedView } from './ThemedView';

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

    const handleChangeTabSwitch = (value: string) => {
        setTab(value);
    };

    const typeValue = useMemo(() => (type === 'register' ? 'Register' : 'Login'), [type]);

    const handleSubmit = () => {
        console.log('submit');
    };

    const handleGGButton = () => {
        console.log('google');
    };

    const handleFbButton = () => {
        console.log('facebook');
    };

    // color theme
    const color = useThemeColor({}, 'text');
    const whiteColor = useThemeColor({}, 'white');
    const dividerColor = useThemeColor({}, 'dividerColor');
    return (
        <ThemedView style={styles.wrapper}>
            <SafeAreaView style={styles.content}>
                <View style={styles.title}>
                    <ThemedText type="title">{typeValue} to Encahero</ThemedText>
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
                    <Input label="Email" value={email} placeholder="example@gmail.com" onChangeText={setEmail} />
                    {tab === 'password' && (
                        <Input label="Password" value={password} placeholder="Abcd123@" onChangeText={setPassword} />
                    )}
                </View>

                {/* button */}
                <Button textStyle={{ color: '#333' }} onPress={handleSubmit}>
                    {tab === 'password' ? typeValue : 'Send'}
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
