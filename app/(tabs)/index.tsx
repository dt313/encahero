import { useCallback, useMemo, useState } from 'react';

import { Image, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import getAvatarOfUser from '@/helper/get-avatar-of-user';
import getNameOfUser from '@/helper/get-name-of-user';
import { RootState } from '@/store/reducers';
import { useSelector } from 'react-redux';

import avatar from '@/assets/images/peeps-avatar-alpha.png';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Charts from '@/components/charts';
import CompletedList from '@/components/completed-list';
import GoalList from '@/components/goal-list';
import SafeArea from '@/components/safe-area';
import ScreenWrapper from '@/components/screen-wrapper';
import StopList from '@/components/stop-list';

const HEADER_HEIGHT = 60;

function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const displayName = useMemo(() => {
        return getNameOfUser(user);
    }, [user]);

    const displayAvatar = useMemo(() => {
        return getAvatarOfUser(user.avatar);
    }, [user]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            console.log('refresh done');
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <ScreenWrapper>
            <SafeArea
                style={{
                    padding: 20,
                    flex: 1,
                }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl tintColor="#000" refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <ThemedView style={styles.header}>
                        <View style={styles.textWrapper}>
                            <ThemedText type="title" style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
                                Hello, {displayName}
                            </ThemedText>
                            <ThemedText lightColor="#636363ff">Lets check how you feel to day</ThemedText>
                        </View>
                        <Image style={styles.avatar} source={displayAvatar ? { uri: displayAvatar } : avatar} />
                    </ThemedView>

                    <Charts />

                    <GoalList containerStyle={{ marginTop: 16 }} title="Today's Goal" />
                    <StopList containerStyle={{ marginTop: 16 }} title="Stop List" />
                    <CompletedList containerStyle={{ marginTop: 16 }} title="Completed List" />
                </ScrollView>
            </SafeArea>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: HEADER_HEIGHT,
    },

    greeting: {
        marginRight: 12,
    },

    textWrapper: { rowGap: 4, maxWidth: '80%' },

    avatar: {
        width: HEADER_HEIGHT,
        height: HEADER_HEIGHT,
        borderRadius: 4,
    },
});

export default Home;
