import { useState } from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ContributionGraph as Graph } from 'react-native-chart-kit';
import { ContributionChartValue } from 'react-native-chart-kit/dist/contribution-graph/ContributionGraph';

const commitsData = [
    { date: '2025-01-02', count: 1 },
    { date: '2025-01-03', count: 2 },
    { date: '2025-01-04', count: 3 },
    { date: '2025-01-05', count: 4 },
    { date: '2025-01-06', count: 5 },
    { date: '2025-01-30', count: 2 },
    { date: '2025-01-31', count: 3 },
    { date: '2025-03-01', count: 2 },
    { date: '2025-04-02', count: 4 },
    { date: '2025-03-05', count: 2 },
    { date: '2025-02-28', count: 4 },
    { date: '2025-05-28', count: 100 },
];

function ContributionGraph({ bgColor }: { bgColor: string }) {
    const [tooltip, setTooltip] = useState<{ date: Date | null; count: number | string } | null>(null);

    const endDate = new Date(new Date().getFullYear(), 11, 31);
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
                    values={commitsData}
                    endDate={endDate}
                    numDays={365}
                    width={1200}
                    height={220}
                    horizontal
                    squareSize={20}
                    gutterSize={1}
                    chartConfig={{
                        backgroundColor: bgColor,
                        backgroundGradientFrom: bgColor,
                        backgroundGradientTo: bgColor,
                        color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
                    }}
                    tooltipDataAttrs={(value) => {
                        const v = value as ContributionChartValue & { count?: number };

                        return {
                            onPress: () => {
                                console.log(value);
                                if (v) {
                                    setTooltip({ date: v.date, count: v.count || 0 });
                                }
                            },
                        };
                    }}
                />
            </ScrollView>

            {tooltip && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                        {tooltip.count ? `${tooltip.count} cards on ${tooltip.date}` : `No cards`}
                    </Text>
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
        backgroundColor: '#74747477',
        padding: 6,
        borderRadius: 6,
        zIndex: 10,
    },
    tooltipText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default ContributionGraph;
