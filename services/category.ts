import instance from '@/config/axios';

export const getCategories = async () => {
    try {
        const res = await instance.get('/categories');
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};

export const getCollectionsOfCategory = async (id: number) => {
    try {
        const res = await instance.get(`/categories/${id}/collection`);
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};
