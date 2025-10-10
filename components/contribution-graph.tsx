import { useState } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { ContributionGraph as Graph } from 'react-native-chart-kit';
import { ContributionChartValue } from 'react-native-chart-kit/dist/contribution-graph/ContributionGraph';

import { progressService } from '@/services';

const commitsData = [
    { date: '2025-09-02', count: 30 },
    { date: '2025-09-03', count: 30 },
    { date: '2025-09-04', count: 30 },
    { date: '2025-09-05', count: 40 },
    { date: '2025-09-06', count: 30 },
    { date: '2025-09-30', count: 30 },
    { date: '2025-09-31', count: 30 },
    { date: '2025-08-01', count: 30 },
    { date: '2025-08-02', count: 30 },
    { date: '2025-07-05', count: 30 },
    { date: '2025-07-28', count: 30 },
    { date: '2025-06-28', count: 200 },
];
function ContributionGraph({ bgColor }: { bgColor: string }) {
    const [tooltip, setTooltip] = useState<{ date: Date | null; count: number | string } | null>(null);

    const endDate = new Date(new Date().getFullYear(), 11, 31);

    const { data: contribution } = useQuery({
        queryKey: ['contribution'],
        queryFn: () => progressService.getContribution(),
    });

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
                    values={contribution ? [...contribution, ...commitsData] : []}
                    endDate={endDate}
                    numDays={365}
                    width={1200}
                    height={220}
                    horizontal
                    squareSize={20}
                    gutterSize={2}
                    onDayPress={({ count, date }) => {
                        setTooltip({ date: date, count: count || 0 });
                    }}
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
