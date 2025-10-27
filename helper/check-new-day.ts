import dayjs from '@/config/dayjs';

import * as storage from '@/utils/storage';

async function checkNewDay(before: string | null, after: string | null) {
    const user = await storage.getUser();
    const timeZone = user?.time_zone || dayjs.tz.guess();

    // If either date is null, consider it a new day
    if (!before || !after) return false;

    const beforeDay = dayjs(before).tz(timeZone).format('YYYY-MM-DD');
    const afterDay = dayjs(after).tz(timeZone).format('YYYY-MM-DD');

    return beforeDay !== afterDay;
}

export default checkNewDay;
