import { router } from 'expo-router';

import axios from 'axios';

import { storage } from '@/utils';

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
});

instance.interceptors.request.use(
    async function (config) {
        const token = await storage.getAccessToken();

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    async function (error: any) {
        console.log('--- Axios response error --- ');

        let messageError = 'Internal Server Error';
        let statusCode = 500;
        let status = 'INTERNAL_SERVER_ERROR';
        const originalRequest = error.config;
        if (error.response && error.response.data) {
            messageError = error.response.data.message;
            statusCode = error.response.data.statusCode;
            status = error.response.data.status;
        }

        console.log(messageError);

        if (status === 'UNAUTHORIZED') {
            // handle token expired
            if (messageError === 'Access token expired') {
                if (!originalRequest.retry) {
                    originalRequest._retry = true;
                    console.log('------- refresh ------- ');
                    try {
                        const accessToken = await refreshToken();
                        error.config.headers.Authorization = `Bearer ${accessToken}`;
                        return axios(error.config);
                    } catch (error) {
                        console.log('Refresh token', error);
                    }
                }
            } else {
                try {
                    await Promise.all([
                        storage.clearAllTokens(),
                        storage.clearUser(),
                        instance.get('/auth/logout').catch(() => {}), // bỏ qua lỗi logout
                    ]);

                    router.replace('/login');
                } catch (error) {
                    console.error('Logout error', error);
                    router.replace('/login'); // vẫn điều hướng nếu có lỗi
                }
            }
        }

        // Lỗi network hoặc unexpected → reject promise
        return Promise.reject({
            message: messageError,
            statusCode,
            status,
        });
    },
);

const refreshToken = async () => {
    try {
        const token = await storage.getRefreshToken();
        const res = await instance.post(`/auth/refresh-token`, { token });
        const { accessToken } = res.data;
        if (!accessToken) {
            throw new Error('Failed to get access token from refresh');
        }
        storage.setAccessToken(accessToken);
        return accessToken;
    } catch (error) {
        throw error;
    }
};

export default instance;
