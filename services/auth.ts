import instance from '@/config/axios';

export const epLogin = async (email: string, password: string, deviceId: string) => {
    try {
        return await instance.post(`/auth/login`, { email, password, deviceId });
    } catch (error: any) {
        throw error;
    }
};

export const epRegister = async (email: string, password: string, deviceId: string) => {
    try {
        return await instance.post(`/auth/register`, { email, password, deviceId });
    } catch (error: any) {
        throw error;
    }
};

export const magicAuth = async (token: string, deviceId: string) => {
    try {
        return await instance.post(`/auth/magic-link`, { token, deviceId });
    } catch (error: any) {
        throw error;
    }
};

export const ggLogin = async (token: string, deviceId: string) => {
    try {
        return await instance.post(`/auth/google-login`, { token, deviceId });
    } catch (error: any) {
        throw error;
    }
};

export const ggRegister = async (token: string, deviceId: string) => {
    try {
        return await instance.post(`/auth/google-register`, { token, deviceId });
    } catch (error: any) {
        throw error;
    }
};

export const logout = async (token: string | undefined) => {
    try {
        return await instance.post(`/auth/logout`, { token });
    } catch (error: any) {
        throw error;
    }
};
