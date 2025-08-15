import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BookOpen02Icon, Settings01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Bar } from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import ReviewCard from '@/components/flashcards/review-card';

import { useThemeColor } from '@/hooks/useThemeColor';

function Quiz() {
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]}>
                    <HugeiconsIcon icon={BookOpen02Icon} size={24} color={textColor} />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={styles.headerName} numberOfLines={1} ellipsizeMode="tail">
                    Hello anh em nhe toi la tuan bhehehe
                </ThemedText>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]}>
                    <HugeiconsIcon icon={Settings01Icon} size={24} color={textColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.progress}>
                <ThemedText style={styles.progressNumber}>1</ThemedText>
                <Bar
                    style={{ flex: 1, marginHorizontal: 12 }}
                    color="#4CAF50"
                    height={12}
                    progress={0.4}
                    width={null}
                    borderWidth={0}
                    unfilledColor="rgba(198, 198, 198, 0.4)"
                />
                <ThemedText style={[styles.progressNumber]}>200</ThemedText>
            </View>

            <View style={styles.flashcards}>
                {/* <TypingCard /> */}
                <ReviewCard />
                {/* <MultipleChoice /> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginBottom: 12,
    },

    headerName: {
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 24,
    },

    btnWrap: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        // Shadow cho iOS
        shadowColor: '#9e9e9eff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow cho Android
        elevation: 5,
    },

    progress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 12,
        paddingHorizontal: 12,
    },

    progressNumber: {
        fontWeight: 500,
        fontSize: 18,
    },

    flashcards: {
        flex: 1,
    },
});

export default Quiz;
