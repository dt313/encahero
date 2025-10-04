import ReduxActionType from '@/types/redux-action-type';
import { Dispatch } from '@reduxjs/toolkit';

import { TOAST_TYPE } from '@/constants';

import { getDeviceFingerprint, getErrorMessage, storage } from '@/utils';

import { authServices } from '@/services';

import { addToast } from './toast-action';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';
export const UPDATE_USER = 'UPDATE_USER';

export const login = (payload: any): ReduxActionType => {
    return {
        type: LOGIN,
        payload,
    };
};

export const logout = (): ReduxActionType => {
    return {
        type: LOGOUT,
    };
};

export const updateUser = (payload: any): ReduxActionType => {
    return {
        type: UPDATE_USER,
        payload,
    };
};

export const initializeAuth = () => async (dispatch: Dispatch<ReduxActionType>) => {
    try {
        const token = await storage.getAccessToken();
        const user = await storage.getUser();
        if (token && user) {
            dispatch(login(user));
        }
    } catch (error) {
        throw error;
    }
};

export const socialAuthAsync =
    (idToken: string, isRegister: boolean = false) =>
    async (dispatch: Dispatch) => {
        let res = null;
        try {
            const deviceFinger = getDeviceFingerprint();
            if (isRegister) {
                res = await authServices.ggRegister(idToken, deviceFinger);
            } else {
                res = await authServices.ggLogin(idToken, deviceFinger);
            }

            const { accessToken, refreshToken, user } = res.data;

            if (!accessToken || !refreshToken || !user) {
                throw new Error('Invalid login response');
            }

            await Promise.all([
                storage.setAccessToken(accessToken),
                storage.setRefreshToken(refreshToken),
                storage.setUser(user),
            ]);

            dispatch(login(user)); // cập nhật Redux state
        } catch (error: any) {
            throw error;
        }
    };

export const epAuth =
    (email: string, password: string, isRegister: boolean = false) =>
    async (dispatch: Dispatch) => {
        let res = null;
        try {
            const deviceFinger = getDeviceFingerprint();

            if (isRegister) {
                res = await authServices.epRegister(email, password, deviceFinger);
            } else {
                res = await authServices.epLogin(email, password, deviceFinger);
            }

            const { accessToken, refreshToken, user } = res.data;

            if (!accessToken || !refreshToken || !user) {
                throw new Error('Invalid login response');
            }

            await Promise.all([
                storage.setAccessToken(accessToken),
                storage.setRefreshToken(refreshToken),
                storage.setUser(user),
            ]);

            dispatch(login(user));
        } catch (error: any) {
            throw error;
        }
    };

export const magicAuth = (token: string) => async (dispatch: Dispatch) => {
    let res = null;
    try {
        const deviceFinger = getDeviceFingerprint();

        res = await authServices.magicAuth(token, deviceFinger);

        const { accessToken, refreshToken, user } = res.data;

        if (!accessToken || !refreshToken || !user) {
            throw new Error('Invalid login response');
        }

        await Promise.all([
            storage.setAccessToken(accessToken),
            storage.setRefreshToken(refreshToken),
            storage.setUser(user),
        ]);

        dispatch(login(user)); // cập nhật Redux state
    } catch (error: any) {
        throw error;
    }
};

export const logoutAsync = () => async (dispatch: Dispatch) => {
    try {
        // call api logout
        const accessToken = await storage.getAccessToken();
        await authServices.logout(accessToken as string | undefined);
        await Promise.all([storage.clearAllTokens(), storage.clearUser()]);
        dispatch(logout());
    } catch (error: any) {
        const message = getErrorMessage(error, 'Logout Error');
        dispatch(addToast({ type: TOAST_TYPE.ERROR, message: message }));
    }
};
