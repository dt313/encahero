import { Image, StyleSheet, View } from 'react-native';

import chargerIcon from '@/assets/images/charger.png';
import thunderIcon from '@/assets/images/thunder.png';

import { ThemedText } from './ThemedText';

const data = [
    {
        title: 'Today',
        count: '112',
        image: chargerIcon,
    },
    {
        title: 'This Week',
        count: '1120',
        image: thunderIcon,
    },
];
function Statistic() {
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
