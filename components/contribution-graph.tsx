import { useMemo, useState } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { RootState } from '@/store/reducers';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ContributionGraph as Graph } from 'react-native-chart-kit';
import { ContributionChartValue } from 'react-native-chart-kit/dist/contribution-graph/ContributionGraph';
import { useSelector } from 'react-redux';

import { generateGraphData } from '@/utils';
import { getEndOfYearUTC } from '@/utils/get-end-of-year';

import { progressService } from '@/services';

dayjs.extend(utc);
dayjs.extend(timezone);

function ContributionGraph({ bgColor }: { bgColor: string }) {
    const [tooltip, setTooltip] = useState<{ date: string | null; count: number | string } | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const userTimeZone = user?.time_zone ?? 'UTC';
    const { data: contribution } = useQuery({
        queryKey: ['contribution'],
        queryFn: () => progressService.getContribution(),
    });

    const endDate = useMemo(() => getEndOfYearUTC(userTimeZone), [userTimeZone]);

    const normalizedContribution = useMemo(
        () => generateGraphData(contribution ?? [], endDate),
        [contribution, endDate],
    );

    const handleDayPress = ({ count, date }: { count?: number; date: string | Date }) => {
        const formattedDate = typeof date === 'string' ? date.split('T')[0] : dayjs(date).utc().format('YYYY-MM-DD');

        setTooltip({ count: count || 0, date: formattedDate });
    };
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
                centerContent
            >
                <Graph
                    values={normalizedContribution ?? []}
                    endDate={endDate}
                    numDays={365}
                    width={1200}
                    height={220}
                    horizontal
                    squareSize={20}
                    gutterSize={2}
                    onDayPress={handleDayPress}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity) => {
                            if (opacity === 0.15) {
                                return `#e2e2e277`;
                            }
                            return `rgba(255, 152, 0,${opacity})`;
                        },
                        propsForLabels: {
                            fill: '#FF9800',
                            fontWeight: 'bold',
                            strokeWidth: 1,
                        },
                    }}
                    tooltipDataAttrs={(value) => {
                        const v = value as ContributionChartValue & { count?: number };
                        return {
                            rx: v?.count ? 12 : 0,
                            ry: v?.count ? 12 : 0,
                        };
                    }}
                />
            </ScrollView>

            {tooltip && (
                <View style={styles.tooltip}>
                    <Text
                        style={styles.tooltipText}
                    >{`${tooltip.count} cards on ${tooltip.date ? new Date(tooltip.date).toISOString().split('T')[0] : ''}`}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: 'auto',
    },
    scrollView: {
        // backgroundColor: '#333',
    },
    scrollContent: {
        // Remove flex: 1 - this was preventing horizontal scrolling
        // backgroundColor: '#333',
        // paddingHorizontal: 10,
    },
    tooltip: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: [{ translateX: '-50%' }],
        backgroundColor: '#747474',
        padding: 6,
        borderRadius: 6,
        zIndex: 10,
    },
    tooltipText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ContributionGraph;
