import React, { useState } from 'react';

import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import HeaderWithBack from '@/components/header-with-back';
import ImageUpload from '@/components/image-upload';

import { useThemeColor, useThemeColors } from '@/hooks/useThemeColor';

export default function FeedbackScreen() {
    const colors = useThemeColors();
    const inputBorderColor = useThemeColor({}, 'inputBorderColor');

    const [feedback, setFeedback] = useState('');

    const handleSend = () => {
        Alert.alert('Success', 'Your feedback has been sent!');
        setFeedback('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <HeaderWithBack title="Feedback" />

                <ThemedText style={styles.description}>We’d love to hear your thoughts or suggestions!</ThemedText>

                <TextInput
                    style={[styles.input, { borderColor: inputBorderColor, color: colors.text }]}
                    value={feedback}
                    onChangeText={setFeedback}
                    placeholder="Write your feedback..."
                    placeholderTextColor="#A0A0A0"
                    multiline
                    numberOfLines={6}
                />

                <ImageUpload />

                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSend}>
                        <ThemedText style={styles.buttonText}>Send</ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
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

    description: { fontSize: 16, marginBottom: 16 },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        textAlignVertical: 'top',
        marginBottom: 16,
        height: 120,
        fontSize: 16,
    },
    imageRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
    imageWrapper: { position: 'relative', marginRight: 8, marginBottom: 8 },
    image: { width: 100, height: 100, borderRadius: 12 },
    removeButton: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: 'red',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    button: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
