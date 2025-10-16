// NotificationManager.ts
import { Alert } from 'react-native';

import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PERMISSION_KEY = 'notificationPermissionAsked';

export const removeNotificationPermissionKey = async () => {
    try {
        await AsyncStorage.removeItem(NOTIFICATION_PERMISSION_KEY);
        console.log('Key đã được xóa');
    } catch (error) {
        console.log('Lỗi khi xóa key:', error);
    }
};

export const requestNotificationPermission = async () => {
    try {
        await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'true');

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Thông báo', 'Bạn đã từ chối nhận thông báo. Có thể bật lại trong Cài đặt.');
            return false;
        }
        return true;
    } catch (error) {
        console.log('Error requesting notification permission:', error);
        return false;
    }
};

// Kiểm tra đã hỏi permission chưa, nếu chưa → hỏi
export const askPermissionIfNeeded = async () => {
    const asked = await AsyncStorage.getItem(NOTIFICATION_PERMISSION_KEY);
    if (asked === 'true') return;
    await requestNotificationPermission();
};
