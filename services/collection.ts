import instance from '@/config/axios';

export const getMyLearningList = async () => {
    try {
        const res = await instance.get('/collections/my-collection');
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};

export const getAllCollection = async () => {
    try {
        const res = await instance.get('/collections');
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};
