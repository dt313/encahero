import { StyleSheet, View, ViewStyle } from 'react-native';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useQuery } from '@tanstack/react-query';
import * as Progress from 'react-native-progress';

import { useThemeColor } from '@/hooks/useThemeColor';

import { collectionService } from '@/services';

import { ThemedText } from './ThemedText';
import Button from './button';

type GoalListType = {
    title?: string;
    containerStyle?: ViewStyle;
};

type GoalItemType = {
    index: number;
    name: string;
    todayCount: number;
    taskCount: number;
};

const GoalItem = ({ index, name, todayCount, taskCount }: GoalItemType) => {
    const bgColor = useThemeColor({}, 'white');
    const goalBg = useThemeColor({}, 'goalBg');
    const lighterText = useThemeColor({}, 'lighterText');

    const progress = taskCount > 0 ? todayCount / taskCount : 0;
    return (
        <View style={[styles.item, { backgroundColor: index % 2 === 0 ? bgColor : goalBg }]}>
            <View style={styles.header}>
                <ThemedText type="defaultSemiBold" style={styles.itemName} numberOfLines={1}>
                    {name}
                </ThemedText>

                <Button
                    type="link"
                    textStyle={{ color: lighterText, paddingVertical: 0, fontWeight: 400 }}
                    rightIcon={<HugeiconsIcon icon={ArrowRight01Icon} color={lighterText} />}
                >
                    Learn
                </Button>
            </View>

            <View style={{ flex: 1 }}>
                <View style={styles.numberBox}>
                    <ThemedText
                        style={{
                            fontWeight: 500,
                        }}
                    >
                        Today
                    </ThemedText>
                    <ThemedText
                        style={{
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        {todayCount}
                        <ThemedText lighter>/{taskCount} cards</ThemedText>
                    </ThemedText>
                </View>
                <Progress.Bar
                    color="#4CAF50"
                    progress={progress}
                    width={null}
                    borderWidth={0}
                    height={6}
                    unfilledColor="rgba(198, 198, 198, 0.4)"
                />
            </View>
        </View>
    );
};

function GoalList({ title, containerStyle }: GoalListType) {
    const {
        data: learningList = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['goalList'],
        queryFn: () => collectionService.getMyLearningList(),
    });

    console.log({ learningList });
    return (
        <View style={[containerStyle]}>
            <ThemedText type="subtitle">{title}</ThemedText>
            <View style={styles.body}>
                {learningList.map((item: any, index: number) => {
                    return (
                        <GoalItem
                            key={item.id}
                            index={index}
                            name={item.collection.name}
                            taskCount={item.task_count}
                            todayCount={item.today_learned_count}
                        />
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
        marginRight: 8,
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
        marginBottom: 4,
    },
});

export default GoalList;
