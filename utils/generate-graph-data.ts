import dayjs from '@/config/dayjs';

export default function generateGraphData(contribution: { date: string; count: number }[], endDate: string | Date) {
    const result: { date: string; count: number }[] = [];

    const end = dayjs(endDate).utc().startOf('day');
    const start = end.subtract(364, 'day');

    for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
        const dateStr = d.format('YYYY-MM-DD');
        const existing = contribution.find((c) => c.date === dateStr);
        result.push({ date: dateStr, count: existing ? existing.count : 0 });
    }

    return result;
}
