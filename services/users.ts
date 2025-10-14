import instance from '@/config/axios';

export const getUsers = async () => {
    try {
        return await instance.get('/users');
    } catch (error) {
        throw error;
    }
};

export const updateTimeZone = async (timeZone: string) => {
    try {
        const res = await instance.post('/users/time-zone', { timeZone });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (id: string, data: FormData) => {
    try {
        const res = await instance.patch(`/users/${id}`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
