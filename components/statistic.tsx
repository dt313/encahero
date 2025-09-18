import { useMemo } from 'react';

import { Image, StyleSheet, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import chargerIcon from '@/assets/images/charger.png';
import thunderIcon from '@/assets/images/thunder.png';

import { progressService } from '@/services';

import { ThemedText } from './ThemedText';

function Statistic() {
    const {
        data: stats,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['userStatsDailyAndWeekly'],
        queryFn: () => progressService.getStatsDailyAndWeekly(),
    });

    const data = useMemo(
        () => [
            {
                title: 'Today',
                count: stats?.today ?? 0,
                image: chargerIcon,
            },
            {
                title: 'This Week',
                count: stats?.week ?? 0,
                image: thunderIcon,
            },
        ],
        [stats],
    );

    return (
        <View style={styles.wrapper}>
            {data.map((item) => {
                return (
                    <View key={item.title} style={styles.item}>
                        <Image source={item.image} style={styles.icon} />
                        <View>
                            <ThemedText lighter style={styles.title}>
                                {item.title}
                            </ThemedText>
                            <ThemedText type="subtitle">{item.count} Cards</ThemedText>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 4,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    icon: {
        width: 32,
        height: 32,
        marginRight: 8,
    },

    title: {
        fontSize: 14,
        fontWeight: 500,
    },
});

export default Statistic;
