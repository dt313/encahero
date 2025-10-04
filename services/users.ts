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
        return await instance.post('/users/time-zone', { timeZone });
    } catch (error) {
        throw error;
    }
};
