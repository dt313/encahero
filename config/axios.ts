import axios from 'axios';

import { storage } from '@/utils';

const instance = axios.create({
    baseURL: 'http://192.168.1.103:3000/api/v1',
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
    function (error: any) {
        console.log('--- Axios response error --- ');
        console.log(error.response.data);

        let messageError = 'Internal Server Error';
        let statusCode = 500;
        let status = 'INTERNAL_SERVER_ERROR';
        if (error.response && error.response.data) {
            messageError = error.response.data.message;
            statusCode = error.response.data.statusCode;
            status = error.response.data.status;
        }

        // Lỗi network hoặc unexpected → reject promise
        return Promise.reject({
            message: messageError,
            statusCode,
            status,
        });
    },
);

export default instance;
