import React, { useCallback, useMemo, useState } from 'react';

import { Alert, Image, Platform, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { useThemeSwitcher } from '@/context/custom-theme-provider';
import getAvatarOfUser from '@/helper/get-avatar-of-user';
import getNameOfUser from '@/helper/get-name-of-user';
import { AppDispatch } from '@/store';
import { logoutAsync } from '@/store/action/auth-action';
import { initLearningList } from '@/store/action/learning-list-action';
import { RootState } from '@/store/reducers';
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
    User02FreeIcons,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '@/assets/images/peeps-avatar-alpha.png';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import SafeArea from '@/components/safe-area';
import ScreenWrapper from '@/components/screen-wrapper';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function SettingsScreen() {
    const { mode, toggleTheme } = useThemeSwitcher();
    const [pushNotif, setPushNotif] = useState(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const queryClient = useQueryClient();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        queryClient.clear();
        dispatch(logoutAsync());
        dispatch(initLearningList([]));
        router.replace('/login');
    };

    const displayName = useMemo(() => {
        return getNameOfUser(user);
    }, [user]);

    const displayAvatar = useMemo(() => {
        return getAvatarOfUser(user.avatar);
    }, [user]);

    // ✅ Common handler for items
    const handlePress = useCallback((label: string) => {
        switch (label) {
            case 'Thông tin cá nhân':
                router.push('/information');
                break;
            case 'Mật khẩu & Bảo mật':
                router.push('/mail-otp');
                break;
            case 'Chính sách bảo mật':
                router.push('/privacy-policy');
                break;
            case 'Góp ý':
                router.push('/feedback');
                break;
            case 'Sử dụng':
                Alert.alert('Navigate', 'Go to Usage');
                break;
            case 'Nhắc nhở học tập':
                Alert.alert('Navigate', 'Go to Reminders');
                break;
            case 'Trợ giúp':
                router.push('/help');
                break;
            case 'Giới thiệu':
                router.push('/about');

                break;
            default:
                break;
        }
    }, []);

    const textColor = useThemeColor({}, 'text');
    const settingBoxBg = useThemeColor({}, 'settingBoxBg');
    const shadowColor = useThemeColor({}, 'shadowColor');
    return (
        <ScreenWrapper>
            <SafeArea style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 24 }}>
                    {/* Avatar + Info */}
                    <View style={styles.profileSection}>
                        <View style={{ padding: 4, borderWidth: 1.5, borderColor: '#d1d1d1ff', borderRadius: 100 }}>
                            <Image source={displayAvatar ? { uri: displayAvatar } : avatar} style={styles.avatar} />
                        </View>
                        <ThemedText type="subtitle" style={{ marginVertical: 4 }}>
                            {displayName}
                        </ThemedText>
                        <ThemedText lighter>{user?.email}</ThemedText>
                    </View>

                    {/* Setting list */}
                    <View style={[styles.card, { backgroundColor: settingBoxBg, shadowColor }]}>
                        <SettingItem
                            onPress={handlePress}
                            icon={<HugeiconsIcon icon={User02FreeIcons} size={24} color={textColor} />}
                            label="Thông tin cá nhân"
                            isLink
                            nonBorder
                        />
                        <SettingItem
                            onPress={handlePress}
                            icon={<HugeiconsIcon icon={Key01Icon} size={24} color={textColor} />}
                            label="Mật khẩu & Bảo mật"
                            isLink
                            nonBorder
                        />

                        <SettingItem
                            onPress={handlePress}
                            icon={<HugeiconsIcon icon={SecurityLockIcon} size={24} color={textColor} />}
                            label="Chính sách bảo mật"
                            nonBorder
                            isLink
                        />
                    </View>

                    <View style={[styles.card, { backgroundColor: settingBoxBg, shadowColor }]}>
                        <SwitchItem
                            icon={<HugeiconsIcon icon={Moon02Icon} size={24} color={textColor} />}
                            label="Chế độ tối"
                            value={mode === 'dark'}
                            onValueChange={toggleTheme}
                        />
                        <SwitchItem
                            icon={<HugeiconsIcon icon={Notification01Icon} size={24} color={textColor} />}
                            label="Thông báo tiến độ"
                            value={pushNotif}
                            onValueChange={setPushNotif}
                        />
                        <SettingItem
                            onPress={handlePress}
                            icon={<HugeiconsIcon icon={Comment01Icon} size={24} color={textColor} />}
                            label="Góp ý"
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

                    <View style={[styles.card, { backgroundColor: settingBoxBg, shadowColor }]}>
                        <SettingItem
                            onPress={handlePress}
                            icon={<HugeiconsIcon icon={HelpCircleIcon} size={24} color={textColor} />}
                            label="Trợ giúp"
                            isLink
                        />
                        <SettingItem
                            onPress={handlePress}
                            icon={<HugeiconsIcon icon={InformationCircleIcon} size={24} color={textColor} />}
                            label="Giới thiệu"
                            nonBorder
                            isLink
                        />
                    </View>

                    {/* Logout */}
                    <Button type="dangerous" buttonStyle={{ margin: 20 }} onPress={handleLogout}>
                        Đăng xuất
                    </Button>
                </ScrollView>
            </SafeArea>
        </ScreenWrapper>
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

        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
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
