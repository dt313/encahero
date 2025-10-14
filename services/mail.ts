import instance from '@/config/axios';

export const sendLoginMagicLink = async (email: string) => {
    try {
        const res = await instance.post('/mail/login-magic-link', { email });
        return res;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};

export const sendRegisterMagicLink = async (email: string) => {
    try {
        const res = await instance.post('/mail/register-magic-link', { email });
        return res;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};

export const sendResetPasswordOTP = async (email: string) => {
    try {
        const res = await instance.post('/mail/reset-password-otp', { email });
        return res;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};
