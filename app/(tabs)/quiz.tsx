import { useCallback, useRef } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BookOpen02Icon, Settings01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Bar } from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import ReviewCard from '@/components/flashcards/review-card';
import LearningList from '@/components/learning-list';
import ModalBottomSheet from '@/components/modal-bottom-sheet';
import QuizSetting from '@/components/quiz-setting';

import { useThemeColor } from '@/hooks/useThemeColor';

function Quiz() {
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    // Viết hoa chữ cái đầu mỗi từ
    const capitalizeWords = (text: string) => {
        return text.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const leftRef = useRef<BottomSheetModal>(null);
    const rightRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handleOpenListMenu = useCallback(() => {
        leftRef.current?.present();
    }, []);

    // callbacks
    const handleOpenSettingBox = useCallback(() => {
        rightRef.current?.present();
    }, []);

    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]} onPress={handleOpenListMenu}>
                    <HugeiconsIcon icon={BookOpen02Icon} size={24} color={textColor} />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={styles.headerName} numberOfLines={1} ellipsizeMode="tail">
                    {capitalizeWords('Hello anh em nhe toi la tuan bhehehe')}
                </ThemedText>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]} onPress={handleOpenSettingBox}>
                    <HugeiconsIcon icon={Settings01Icon} size={24} color={textColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.progress}>
                <ThemedText style={styles.progressNumber}>1</ThemedText>
                <Bar
                    style={{ flex: 1, marginHorizontal: 12, borderRadius: 30 }}
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

            <ModalBottomSheet bottomSheetModalRef={leftRef}>
                <LearningList />
            </ModalBottomSheet>

            <ModalBottomSheet bottomSheetModalRef={rightRef}>
                <QuizSetting />
            </ModalBottomSheet>
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
