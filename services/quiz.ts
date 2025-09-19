import instance from '@/config/axios';

export const getRandomQuizOfCollection = async (id: number) => {
    try {
        const res = await instance.get(`/quiz/${id}`);
        return res.data;
    } catch (error: any) {
        throw error;
    }
};
