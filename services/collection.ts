import instance from '@/config/axios';

export const getMyLearningList = async () => {
    try {
        const res = await instance.get('/collections/my-collection');
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};

export const getStopCollections = async () => {
    try {
        const res = await instance.get('/collections/stop');
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};

export const getCollectionById = async (id: number) => {
    try {
        const res = await instance.get(`/collections/${id}`);
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

export const getCardsFromCollection = async (id: number | string) => {
    try {
        const res = await instance.get(`/collections/${id}/cards`);
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

export const changeStatusOfCard = async (collectionId: number, cardId: number, status: string) => {
    try {
        const res = await instance.patch(`/collections/${collectionId}/cards/${cardId}/status`, { status });
        return res.data;
    } catch (error: any) {
        throw error;
    }
};

export const changeStatusOfCollection = async (collectionId: number, status: string) => {
    try {
        const res = await instance.patch(`/collections/${collectionId}/status`, { status });
        return res.data;
    } catch (error: any) {
        throw error;
    }
};
