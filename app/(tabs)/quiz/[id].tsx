import { useCallback, useEffect, useRef, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { RootState } from '@/store/reducers';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BookOpen02Icon, Settings01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useIsFocused } from '@react-navigation/native';
import { Bar } from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import LearningList from '@/components/learning-list';
import ModalBottomSheet from '@/components/modal-bottom-sheet';
import QuizSetting from '@/components/quiz-setting';
import RandomQuiz, { Quiz } from '@/components/random-quiz';

import { useThemeColor } from '@/hooks/useThemeColor';

import { quizService } from '@/services';

function QuizScreen() {
    const leftRef = useRef<BottomSheetModal>(null);
    const rightRef = useRef<BottomSheetModal>(null);

    const { id } = useLocalSearchParams();
    const collections = useSelector((state: RootState) => state.learningList.collections);

    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCollection, setCurrentCollection] = useState<CollectionProgress>();
    const isFocus = useIsFocused();

    useEffect(() => {
        const fetchQuiz = async () => {
            let collectionId = 1;
            const res = await quizService.getRandomQuizOfCollection(collectionId);
            setQuizList(res);
            setCurrentIndex(0);
        };

        fetchQuiz();
    }, [id, isFocus, collections]);

    useEffect(() => {
        if (!collections) return;
        let collection = null;
        if (id) collection = collections.find((c: CollectionProgress) => c.collection.id === Number(id));
        else collection = collections[0];
        setCurrentCollection(collection);
    }, [id, collections]);

    const capitalizeWords = (text: string) => {
        return text.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // callbacks
    const handleOpenListMenu = useCallback(() => {
        leftRef.current?.present();
    }, []);

    // callbacks
    const handleOpenSettingBox = useCallback(() => {
        rightRef.current?.present();
    }, []);

    const handleSkip = () => {
        if (currentIndex < quizList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const learned = currentCollection?.today_learned_count ?? 0;
    const total = currentCollection?.task_count ?? 1; // tránh chia cho 0
    const progress = learned / total;

    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]} onPress={handleOpenListMenu}>
                    <HugeiconsIcon icon={BookOpen02Icon} size={24} color={textColor} />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={styles.headerName} numberOfLines={1} ellipsizeMode="tail">
                    {capitalizeWords(currentCollection ? currentCollection?.collection?.name : 'Name')}
                </ThemedText>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]} onPress={handleOpenSettingBox}>
                    <HugeiconsIcon icon={Settings01Icon} size={24} color={textColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.progress}>
                <ThemedText style={styles.progressNumber}>{currentCollection?.today_learned_count}</ThemedText>
                <Bar
                    style={{ flex: 1, marginHorizontal: 12, borderRadius: 30 }}
                    color="#4CAF50"
                    height={12}
                    progress={progress}
                    width={null}
                    borderWidth={0}
                    unfilledColor="rgba(198, 198, 198, 0.4)"
                />
                <ThemedText style={[styles.progressNumber]}>{currentCollection?.task_count}</ThemedText>
            </View>

            <View style={styles.flashcards}>{quizList.length > 0 && <RandomQuiz quiz={quizList[currentIndex]} />}</View>

            <View style={styles.btnBox}>
                <Button type="link">🧠 Đã ghi nhớ</Button>
                <Button type="link" textStyle={{ color: textColor }} onPress={handleSkip}>
                    Skip →
                </Button>
            </View>

            <ModalBottomSheet bottomSheetModalRef={leftRef}>
                <LearningList selectedIndex={currentCollection?.collection.id} />
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
        marginBottom: 24,
        paddingHorizontal: 12,
    },

    progressNumber: {
        fontWeight: 500,
        fontSize: 18,
    },

    flashcards: {
        height: 'auto',
    },

    btnBox: {
        marginTop: 12,
        marginHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default QuizScreen;
