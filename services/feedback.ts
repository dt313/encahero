import instance from '@/config/axios';

export const createFeedBack = async (data: FormData) => {
    try {
        const res = await instance.post('/feedback', data);
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};
