import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import HeaderWithBack from '@/components/header-with-back';
import ScreenWrapper from '@/components/screen-wrapper';

function PrivacyPolicy() {
    const sections = [
        {
            title: '1. Thông tin chúng tôi thu thập',
            content:
                '- Thông tin đăng ký: Tên, email, tài khoản Google/GitHub.\n- Thông tin sử dụng: Số lượng flashcard học, thời gian học, điểm tiến trình.\n- Thông tin thiết bị: Loại thiết bị, hệ điều hành, phiên bản ứng dụng.',
        },
        {
            title: '2. Mục đích sử dụng thông tin',
            content:
                '- Cải thiện trải nghiệm học tập cá nhân hóa.\n- Gửi thông báo quan trọng về ứng dụng, cập nhật tính năng.\n- Phân tích dữ liệu để nâng cao chất lượng ứng dụng.',
        },
        {
            title: '3. Chia sẻ dữ liệu',
            content:
                'Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba cho mục đích quảng cáo.',
        },
        {
            title: '4. Bảo mật thông tin',
            content: 'Chúng tôi sử dụng các biện pháp kỹ thuật và quản lý để bảo vệ thông tin cá nhân của bạn.',
        },
        {
            title: '5. Quyền của người dùng',
            content: 'Bạn có quyền truy cập, chỉnh sửa hoặc xoá thông tin cá nhân trong tài khoản.',
        },
        {
            title: '6. Cookies và công nghệ theo dõi',
            content: 'EncoHero Flashcard chỉ dùng cookie hoặc lưu trữ cục bộ để cải thiện trải nghiệm người dùng.',
        },
        {
            title: '7. Thay đổi chính sách',
            content: 'Chúng tôi có thể cập nhật chính sách này khi cần thiết.',
        },
        {
            title: '8. Liên hệ',
            content: 'Email: support@encohero.com',
        },
    ];

    return (
        <ScreenWrapper>
            <SafeAreaView style={styles.container}>
                <HeaderWithBack title="Chính sách" />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <ThemedText style={styles.title}>Chính sách quyền riêng tư (Privacy Policy)</ThemedText>
                    {sections.map((section, index) => (
                        <View key={index} style={styles.section}>
                            <ThemedText type="defaultSemiBold">{section.title}</ThemedText>
                            <ThemedText style={styles.text}>{section.content}</ThemedText>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ScreenWrapper>
    );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    scrollContainer: { paddingTop: 4 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
    text: { fontSize: 14, lineHeight: 20 },
});
