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

export const registerCollection = async (id: number, taskNum: number) => {
    try {
        const res = await instance.post(`/collections/${id}/registrations`, { taskNum });
        return res.data;
    } catch (error: any) {
        throw error;
    }
};

export const changeTask = async (id: number, taskNum: number) => {
    try {
        const res = await instance.patch(`/collections/${id}/task_count`, { taskNum });
        return res.data;
    } catch (error: any) {
        throw error;
    }
};
