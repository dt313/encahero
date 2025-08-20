import { useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import TypingCard from '@/components/flashcards/typing-card';
import MatchHeader from '@/components/match/header';

const players = [
    { id: 'p1', name: 'You', avatar: 'https://i.pravatar.cc/50?img=1', score: 15, progress: 0.4 },
    { id: 'p2', name: 'Opponent', avatar: 'https://i.pravatar.cc/50?img=2', score: 12, progress: 0.6 },
];

const TOTAL_QUESTIONS = 30;
const QUESTION_TIME = 5000; // 5s per question

export default function Match() {
    const [currentQuestion, setCurrentQuestion] = useState(3); // ví dụ câu thứ 3
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 100) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 100;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [currentQuestion]);

    const timerSec = (timeLeft / 1000).toFixed(1);
    return (
        <LinearGradient
            colors={['#c9d6ff', '#98aae4', '#7fa8e0', '#aed6e1']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 0.3, 0.7, 1]}
            style={{ position: 'absolute', flex: 1, height: '100%' }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <MatchHeader players={players} />

                {/* Question bar */}
                <View style={styles.questionBarContainer}>
                    <ThemedText style={styles.questionText}>
                        Question {`${currentQuestion}/${TOTAL_QUESTIONS}`}
                    </ThemedText>

                    <Text style={styles.timerText}>{timerSec}s</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <TypingCard />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    questionBarContainer: {
        margin: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#dc2626',
    },
});
