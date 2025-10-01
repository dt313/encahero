import instance from '@/config/axios';

export const getStatsDailyAndWeekly = async () => {
    try {
        console.log('call getStatsDailyAndWeekly');
        const res = await instance.get('/progress/stats/daily-and-weekly');
        return res.data;
    } catch (error: any) {
        throw error; // lỗi khác (network, timeout, ...)
    }
};
