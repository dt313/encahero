// src/utils/tokenStorage.ts
import * as SecureStore from 'expo-secure-store';

import AsyncStorage from '@react-native-async-storage/async-storage';

// ================= KEYS =================
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_OBJECT = 'user';

type User = {
    firstName: string | null;
    lastName: string | null;
    username: string;
};

// ================= ACCESS TOKEN =================
export async function setAccessToken(token: string) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function clearAccessToken() {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
}

// ================= REFRESH TOKEN =================
export async function setRefreshToken(token: string) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function clearRefreshToken() {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

// user
export async function setUser(user: object) {
    try {
        await AsyncStorage.setItem(USER_OBJECT, JSON.stringify(user));
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

// get user object
export async function getUser(): Promise<User | null> {
    try {
        const userString = await AsyncStorage.getItem(USER_OBJECT);
        return userString ? (JSON.parse(userString) as User) : null;
    } catch (error) {
        console.error('Error reading user:', error);
        return null;
    }
}

export async function clearUser() {
    try {
        await AsyncStorage.removeItem(USER_OBJECT);
    } catch (error) {
        console.error('Error clearing user:', error);
    }
}

// ================= CLEAR ALL =================
export async function clearAllTokens() {
    await clearAccessToken();
    await clearRefreshToken();
}

export async function getAutoSound() {
    return await AsyncStorage.getItem('autoSound');
}

export async function setAutoSound(value: boolean) {
    await AsyncStorage.setItem('autoSound', value ? 'true' : 'false');
}
