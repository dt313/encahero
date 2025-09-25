import { useMemo } from 'react';

import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';

import getNameOfUser from '@/helper/get-name-of-user';
import { SafeAreaView } from 'react-native-safe-area-context';

import avatar from '@/assets/images/peeps-avatar-alpha.png';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Charts from '@/components/charts';
import GoalList from '@/components/goal-list';
import StopList from '@/components/stop-list';

const HEADER_HEIGHT = 60;

function Home() {
    const displayName = useMemo(async () => {
        return await getNameOfUser();
    }, []);
    return (
        <ScrollView>
            <SafeAreaView
                style={{
                    padding: 20,
                    paddingBottom: Platform.OS === 'android' ? 40 : 80,
                }}
            >
                <ThemedView style={styles.header}>
                    <View style={styles.textWrapper}>
                        <ThemedText type="title" style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
                            Hello, {displayName}
                        </ThemedText>
                        <ThemedText lightColor="#636363ff">Lets check how you feel to day</ThemedText>
                    </View>
                    <Image style={styles.avatar} source={avatar} />
                </ThemedView>

                <Charts />

                <GoalList containerStyle={{ marginTop: 16 }} title="Today's Goal" />
                <StopList containerStyle={{ marginTop: 16 }} title="Stop List" />
            </SafeAreaView>
        </ScrollView>
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
