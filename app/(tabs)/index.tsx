import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import avatar from '@/assets/images/peeps-avatar-alpha.png';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Charts from '@/components/charts';
import GoalList from '@/components/goal-list';

const HEADER_HEIGHT = 60;
const list = [
    {
        name: 'Common Words',
        total: 100,
        count: 12,
    },
    {
        name: 'Business Vocabulary',
        total: 80,
        count: 25,
    },
    {
        name: 'Travel Phrases',
        total: 60,
        count: 15,
    },
    {
        name: 'Academic Words',
        total: 120,
        count: 40,
    },
    {
        name: 'Idioms & Expressions',
        total: 90,
        count: 22,
    },
    {
        name: 'TOEIC Listening Keywords',
        total: 70,
        count: 18,
    },
    {
        name: 'Daily Conversation',
        total: 110,
        count: 30,
    },
];

function Home() {
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
                        <ThemedText type="title">Hello, Danh Tuan</ThemedText>
                        <ThemedText lightColor="#636363ff">Lets check how you feel to day</ThemedText>
                    </View>
                    <Image style={styles.avatar} source={avatar} />
                </ThemedView>

                <Charts />

                <GoalList containerStyle={{ marginTop: 16 }} title="Today's Goal" list={list} />
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

    textWrapper: { rowGap: 4 },

    avatar: {
        width: HEADER_HEIGHT,
        height: HEADER_HEIGHT,
        borderRadius: 4,
    },
});

export default Home;
