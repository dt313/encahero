import instance from '@/config/axios';

export const getUsers = async () => {
    try {
        return await instance.get('/users');
    } catch (error) {
        throw error;
    }
};
