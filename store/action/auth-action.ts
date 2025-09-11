import ReduxActionType from '@/types/redux-action-type';
import { Dispatch } from '@reduxjs/toolkit';

import { TOAST_TYPE } from '@/constants';

import { storage } from '@/utils';

import { authServices } from '@/services';

import { addToast } from './toast-action';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';

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

export const socialLoginAsync = (idToken: string) => async (dispatch: Dispatch) => {
    try {
        const res = await authServices.ggLogin(idToken);
        const { accessToken, refreshToken, user } = res.data;

        if (!accessToken || !refreshToken || !user) {
            throw new Error('Invalid login response');
        }

        await storage.setAccessToken(accessToken);
        await storage.setRefreshToken(refreshToken);
        await storage.setUser(user);

        dispatch(login(user)); // cập nhật Redux state
    } catch (error: any) {
        throw error;
    }
};

export const logoutAsync = () => async (dispatch: Dispatch) => {
    try {
        // call api logout

        // remove all token and data
        await storage.clearAllTokens();
        await storage.clearUser();
        dispatch(logout());
    } catch (error: any) {
        dispatch(addToast({ type: TOAST_TYPE.ERROR, message: error }));
    }
};
