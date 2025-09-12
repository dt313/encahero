import React, { useCallback, useState } from 'react';

import { Alert, Image, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { AppDispatch } from '@/store';
import { logoutAsync } from '@/store/action/auth-action';
import {
    ArrowRight01Icon,
    Clock01Icon,
    Comment01Icon,
    HelpCircleIcon,
    InformationCircleIcon,
    Key01Icon,
    Moon02Icon,
    Notification01Icon,
    SecurityLockIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';

import { useThemeColor } from '@/hooks/useThemeColor';

import { userService } from '@/services';

export default function SettingsScreen() {
    const [darkMode, setDarkMode] = useState(false);
    const [pushNotif, setPushNotif] = useState(true);

    const textColor = useThemeColor({}, 'text');
    const backgroundColor = useThemeColor({}, 'background');
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logoutAsync());
        router.replace('/login');
    };

    const handleTest = async () => {
        await userService.getUsers();
    };
    // ✅ Common handler for items
    const handlePress = useCallback((label: string) => {
        switch (label) {
            case 'Password & Security':
                // router.push('/mail-otp');
                handleTest();
                break;
            case 'Privacy Policy':
                router.push('/privacy-policy');
                break;
            case 'Feedback':
                router.push('/feedback');
                break;
            case 'Usage':
                Alert.alert('Navigate', 'Go to Usage');
                break;
            case 'Nhắc nhở học tập':
                Alert.alert('Navigate', 'Go to Reminders');
                break;
            case 'Help':
                router.push('/help');
                break;
            case 'About':
                router.push('/about');

                break;
            default:
                break;
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Avatar + Info */}
                <View style={styles.profileSection}>
                    <View style={{ padding: 4, borderWidth: 1.5, borderColor: '#d1d1d1ff', borderRadius: 100 }}>
                        <Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} style={styles.avatar} />
                    </View>
                    <ThemedText type="subtitle" style={{ marginVertical: 4 }}>
                        KhelWolf
                    </ThemedText>
                    <ThemedText lighter>mikaelo.navarro@gmail.com</ThemedText>
                </View>

                {/* Setting list */}
                <View style={[styles.card, { backgroundColor: backgroundColor }]}>
                    <SettingItem
                        onPress={handlePress}
                        icon={<HugeiconsIcon icon={Key01Icon} size={24} color={textColor} />}
                        label="Password & Security"
                        isLink
                        nonBorder
                    />

                    <SettingItem
                        onPress={handlePress}
                        icon={<HugeiconsIcon icon={SecurityLockIcon} size={24} color={textColor} />}
                        label="Privacy Policy"
                        nonBorder
                        isLink
                    />
                </View>

                <View style={[styles.card, { backgroundColor: backgroundColor }]}>
                    <SwitchItem
                        icon={<HugeiconsIcon icon={Moon02Icon} size={24} color={textColor} />}
                        label="Dark Theme"
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                    <SwitchItem
                        icon={<HugeiconsIcon icon={Notification01Icon} size={24} color={textColor} />}
                        label="Push Progress Notifications"
                        value={pushNotif}
                        onValueChange={setPushNotif}
                    />
                    <SettingItem
                        onPress={handlePress}
                        icon={<HugeiconsIcon icon={Comment01Icon} size={24} color={textColor} />}
                        label="Feedback"
                        isLink
                    />
                    {/* <SettingItem
                        onPress={handlePress}
                        icon={<HugeiconsIcon icon={Analytics01Icon} size={24} color={textColor} />}
                        label="Usage"
                        isLink
                    /> */}
                    <SettingItem
                        onPress={handlePress}
                        icon={<HugeiconsIcon icon={Clock01Icon} size={24} color={textColor} />}
                        label="Nhắc nhở học tập"
                        nonBorder
                    />
                </View>

                <View style={[styles.card, { backgroundColor: backgroundColor }]}>
                    <SettingItem
                        onPress={handlePress}
                        icon={<HugeiconsIcon icon={HelpCircleIcon} size={24} color={textColor} />}
                        label="Help"
                        isLink
                    />
                    <SettingItem
                        onPress={handlePress}
                        icon={<HugeiconsIcon icon={InformationCircleIcon} size={24} color={textColor} />}
                        label="About"
                        nonBorder
                        isLink
                    />
                </View>

                {/* Logout */}
                <Button type="dangerous" buttonStyle={{ margin: 20 }} onPress={handleLogout}>
                    Logout
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

type SettingItemProps = {
    icon: React.ReactNode;
    label: string;
    nonBorder?: boolean;
    isLink?: boolean;
    onPress: (label: string) => void;
};

function SettingItem({ icon, label, nonBorder = false, isLink = false, onPress, ...props }: SettingItemProps) {
    const textColor = useThemeColor({}, 'text');

    return (
        <TouchableOpacity
            style={[styles.settingItem, nonBorder && { borderBottomWidth: 0 }]}
            onPress={() => onPress(label)}
            {...props}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {icon}
                <ThemedText style={styles.settingText}>{label}</ThemedText>
            </View>
            {!isLink && <HugeiconsIcon icon={ArrowRight01Icon} size={24} color={textColor} />}
        </TouchableOpacity>
    );
}

function SwitchItem({ icon, label, value, onValueChange }: any) {
    return (
        <View style={[styles.settingItem]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {icon}
                <ThemedText style={styles.settingText}>{label}</ThemedText>
            </View>
            <Switch value={value} onValueChange={onValueChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '600',
        fontSize: 16,
        color: '#2c3e50',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    card: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: '#85858566',
    },
    settingText: {
        fontSize: 15,
        marginLeft: 10,
    },
    logoutBtn: {
        marginTop: 30,
        marginHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#e74c3c',
        borderRadius: 16,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
