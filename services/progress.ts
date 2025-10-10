import instance from '@/config/axios';

export const getStatsDailyAndWeekly = async () => {
    try {
        const res = await instance.get('/progress/stats/daily-and-weekly');
        return res.data;
    } catch (error: any) {
        throw error;
    }
};

export const getContribution = async () => {
    try {
        const res = await instance.get('/progress/contribution');
        return res.data;
    } catch (error: any) {
        throw error;
    }
};
