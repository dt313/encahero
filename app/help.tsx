import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HeaderWithBack from '@/components/header-with-back';

export default function HelpScreen() {
    const faqs = [
        {
            question: 'Ứng dụng này dùng để làm gì?',
            answer: 'EncoHero Flashcard giúp bạn học từ vựng và ghi nhớ hiệu quả hơn thông qua flashcard.',
        },
        {
            question: 'Làm sao để tạo flashcard mới?',
            answer: 'Bạn có thể vào mục "My Cards" → chọn "Tạo mới" và thêm từ cùng nghĩa/giải thích.',
        },
        {
            question: 'Có thể sử dụng ứng dụng offline không?',
            answer: 'Có, bạn có thể học với các flashcard đã tải về khi không có kết nối mạng.',
        },
        {
            question: 'Tôi có thể đồng bộ dữ liệu không?',
            answer: 'Có, khi bạn đăng nhập, flashcard sẽ được đồng bộ giữa các thiết bị.',
        },
    ];

    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <HeaderWithBack title="Trợ giúp và FAQ" />

                <ScrollView>
                    {faqs.map((item, index) => (
                        <Collapsible key={index} title={item.question}>
                            <ThemedText>{item.answer}</ThemedText>
                        </Collapsible>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
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
});
