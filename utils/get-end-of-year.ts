import dayjs from '@/config/dayjs';

export function getEndOfYearUTC(timeZone: string) {
    // 31/12 23:59:59 timezone user
    const endOfYearLocal = dayjs.tz(`${dayjs().year()}-12-31 23:59:59`, timeZone);
    // Chuyển về UTC midnight
    const endOfYearUTC = endOfYearLocal.utc().startOf('day');
    return endOfYearUTC.toDate();
}
