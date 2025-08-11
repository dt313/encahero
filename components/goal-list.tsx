import { StyleSheet, View, ViewStyle } from 'react-native';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as Progress from 'react-native-progress';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

type GoalListType = {
    title?: string;
    list: any;
    containerStyle?: ViewStyle;
};

function GoalList({ title, list, containerStyle }: GoalListType) {
    const bgColor = useThemeColor({}, 'white');
    const goalBg = useThemeColor({}, 'goalBg');
    const lighterText = useThemeColor({}, 'lighterText');
    return (
        <View style={[containerStyle]}>
            <ThemedText type="subtitle">{title}</ThemedText>
            <View style={styles.body}>
                {list.map((item: any, index: number) => {
                    return (
                        <View
                            key={item.name}
                            style={[styles.item, { backgroundColor: index % 2 === 0 ? bgColor : goalBg }]}
                        >
                            <View style={styles.header}>
                                <ThemedText type="defaultSemiBold" style={styles.itemName}>
                                    {item.name}
                                </ThemedText>

                                <Button
                                    type="link"
                                    textStyle={{ color: lighterText, paddingVertical: 0, fontWeight: 400 }}
                                    rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} color={lighterText} />}
                                >
                                    Learn
                                </Button>
                            </View>
                            <View style={styles.numberBox}>
                                <ThemedText
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                    }}
                                >
                                    {item.count}
                                    <ThemedText lighter>/{item.total} cards</ThemedText>
                                </ThemedText>
                                <ThemedText type="title">120%</ThemedText>
                            </View>
                            <Progress.Bar
                                style={{ flex: 1, height: 6 }}
                                color="#4CAF50"
                                progress={0.4}
                                width={null}
                                borderWidth={0}
                                unfilledColor="rgba(198, 198, 198, 0.4)"
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        marginTop: 20,
        rowGap: 8,
    },
    item: {
        backgroundColor: '#d39b9bff',
        borderRadius: 30,
        padding: 20,
        paddingBottom: 24,
        overflow: 'hidden',
    },
    itemName: {
        marginBottom: 12,
        flex: 1,
        textOverflow: 'es',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    numberBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default GoalList;
