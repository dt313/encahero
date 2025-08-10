import { Image, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import image from '@/assets/images/fb-icon.png';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 60;
function Home() {
    return (
        <SafeAreaView
            style={{
                padding: 20,
            }}
        >
            <ThemedView style={styles.header}>
                <View style={styles.textWrapper}>
                    <ThemedText type="title">Hello, Danh Tuan</ThemedText>
                    <ThemedText lightColor="#636363ff">Let's check how you feel to day</ThemedText>
                </View>
                <Image style={styles.avatar} source={image} />
            </ThemedView>
        </SafeAreaView>
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
