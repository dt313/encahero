import { useEffect, useState } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { useRouter } from 'expo-router';

import { RootState } from '@/store/reducers';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { ArrowRightDoubleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';
import Button from './button';

type GoalListType = {
    title?: string;
    containerStyle?: ViewStyle;
};

type GoalItemType = {
    id: number;
    index: number;
    name: string;
    todayCount: number;
    taskCount: number;
};

const GoalItem = ({ index, id, name, todayCount, taskCount }: GoalItemType) => {
    const mainBoxBg = useThemeColor({}, 'mainBoxBg');
    const goalBg = useThemeColor({}, 'goalBg');
    const lighterText = useThemeColor({}, 'lighterText');

    const progress = taskCount > 0 ? todayCount / taskCount : 0;
    const router = useRouter();

    return (
        <View style={[styles.item, { backgroundColor: index % 2 === 0 ? mainBoxBg : goalBg }]}>
            <View style={styles.header}>
                <ThemedText type="defaultSemiBold" style={styles.itemName} numberOfLines={1}>
                    {name}
                </ThemedText>

                <Button
                    type="link"
                    textStyle={{ color: lighterText, paddingVertical: 0, fontWeight: 400 }}
                    rightIcon={<HugeiconsIcon icon={ArrowRightDoubleIcon} color={lighterText} size={20} />}
                    onPress={() =>
                        router.push({
                            pathname: '/quiz/[id]',
                            params: { id: id },
                        })
                    }
                >
                    {todayCount <= 0 ? 'Bắt đầu ' : progress > 1 ? 'Ôn tập' : 'Tiếp tục'}
                </Button>
            </View>

            <View style={{ flex: 1 }}>
                <View style={styles.numberBox}>
                    <ThemedText
                        style={{
                            fontWeight: 500,
                        }}
                    >
                        {progress > 1 ? '🎉🎉🎉' : '🔥 Thành tích'}
                    </ThemedText>
                    <ThemedText
                        style={{
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        {todayCount}
                        <ThemedText lighter>/{taskCount} quizs</ThemedText>
                    </ThemedText>
                </View>
                <Progress.Bar
                    color="#4caf50"
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
    const collections = useSelector((state: RootState) => state.learningList.collections);
    const [progressList, setProgressList] = useState<CollectionProgress[]>([]);

    useEffect(() => {
        setProgressList(collections.filter((item: CollectionProgress) => item.status === 'in_progress'));
    }, [collections]);

    return (
        <View style={[containerStyle]}>
            <ThemedText type="subtitle">{title}</ThemedText>
            {progressList.length <= 0 && (
                <View style={{ marginTop: 12 }}>
                    <ThemedText style={{ fontStyle: 'italic', fontSize: 14 }}>
                        Chưa có nhiệm vụ nào . Hãy đăng kí các bài học mới
                    </ThemedText>
                </View>
            )}
            <View style={styles.body}>
                {progressList.map((item: any, index: number) => {
                    return (
                        <GoalItem
                            key={item.id}
                            id={item.collection_id}
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
