import instance from '@/config/axios';

export const loginByMagicLink = (email: string) => {
    try {
        return instance.post('/auth/magic-login-link', {email});
    } catch (error: any) {
        console.log('error loginByMagicLink', error.message);
        return error;
    }
};

export const loginByPassword = (email: string, password: string) => {
    try {
        return instance.post('/auth/login', {email, password});
    } catch (error: any) {
        console.log('error loginByPassword', error.message);
        return error;
    }
};

export const registerByMagicLink = (email: string) => {
    try {
        return instance.post('/auth/magic-register-link', {email});
    } catch (error) {
        console.log('error registerByMagicLink', error.message);
        return error;
    }
};