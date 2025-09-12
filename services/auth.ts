import instance from '@/config/axios';
import axios from 'axios';

export const loginByMagicLink = async (email: string) => {
    try {
        const res = await instance.post('/auth/magic-login-link', { email });
        return res;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};

export const ggLogin = async (token: string) => {
    try {
        return await instance.post(`/auth/google-login`, { token });
    } catch (error: any) {
        throw error;
    }
};

export const ggRegister = async (token: string) => {
    try {
        return await instance.post(`/auth/google-register`, { token });
    } catch (error: any) {
        throw error;
    }
};

export const test = async () => {
    try {
        const res = await axios.get('http://192.168.1.103:3000/api/v1');
        console.log('res test', res.data);
        return res.data;
    } catch (error: any) {
        console.log('error test', error.message);
        return error;
    }
};
