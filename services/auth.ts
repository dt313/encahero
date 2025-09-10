import instance from '@/config/axios';
import axios from 'axios';

export const loginByMagicLink = async (email: string) => {
    try {
        return instance.post('/auth/magic-login-link', { email });
    } catch (error: any) {
        console.log('error loginByMagicLink', error.message);
        return error;
    }
};

export const ggLogin = async (token: string) => {
    try {
        const res = await instance.post(`/auth/google-login`, { token });
        return res.data;
    } catch (error: any) {
        console.log('error ggLogin', error.message);
        return error;
    }
};

export const ggRegister = async (token: string) => {
    try {
        const res = await instance.post(`/auth/google-register`, { token });
        console.log('Register ; ', res);
        return res.data;
    } catch (error: any) {
        console.log('error ggRegister', error.message);
        return error;
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
