import React from 'react';

import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import HeaderWithBack from '@/components/header-with-back';
import ScreenWrapper from '@/components/screen-wrapper';

export default function About() {
    const appVersion = '1.0.0';
    const developer = 'EncoHero Team';
    const githubUrl = 'https://github.com/encohero';
    const websiteUrl = 'https://encohero.com';

    const openLink = (url: string) => {
        Linking.openURL(url).catch((err) => console.error('Cannot open link: ', err));
    };

    return (
        <ScreenWrapper>
            <SafeAreaView style={styles.container}>
                <HeaderWithBack title="About" />

                {/* Nội dung About */}
                <ThemedText style={styles.description}>
                    Ứng dụng giúp bạn học tập hiệu quả hơn với flashcards.
                </ThemedText>

                <View style={styles.item}>
                    <ThemedText style={styles.label}>Phiên bản:</ThemedText>
                    <ThemedText>{appVersion}</ThemedText>
                </View>

                <View style={styles.item}>
                    <ThemedText style={styles.label}>Nhà phát triển:</ThemedText>
                    <ThemedText>{developer}</ThemedText>
                </View>

                <ThemedText style={styles.label}>GitHub:</ThemedText>
                <TouchableOpacity style={styles.item} onPress={() => openLink(githubUrl)}>
                    <ThemedText style={styles.link}>{githubUrl}</ThemedText>
                </TouchableOpacity>

                <ThemedText style={styles.label}>Website:</ThemedText>
                <TouchableOpacity style={styles.item} onPress={() => openLink(websiteUrl)}>
                    <ThemedText style={styles.link}>{websiteUrl}</ThemedText>
                </TouchableOpacity>
            </SafeAreaView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    description: { fontSize: 16, marginBottom: 24 },
    item: { marginBottom: 16 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    link: { color: '#1E90FF' },
});
