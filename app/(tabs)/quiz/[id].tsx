import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { answerCard, changeStatus, increaseMasteredCount } from '@/store/action/learning-list-action';
import { RootState } from '@/store/reducers';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BookOpen02Icon, Settings01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Bar } from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/button';
import LearningList from '@/components/learning-list';
import ModalBottomSheet from '@/components/modal-bottom-sheet';
import QuizSetting from '@/components/quiz-setting';
import RandomQuiz, { QuestionType, Quiz } from '@/components/random-quiz';

import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { collectionService, quizService } from '@/services';
import type { QuizMode } from '@/services/quiz';

function QuizScreen() {
    const leftRef = useRef<BottomSheetModal>(null);
    const rightRef = useRef<BottomSheetModal>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id, mode } = useLocalSearchParams();
    const collections = useSelector((state: RootState) => state.learningList.collections);
    const { showErrorToast, showSuccessToast } = useToast();

    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCollection, setCurrentCollection] = useState<CollectionProgress>();
    const [isReviewMode, setIsReviewMode] = useState(false);

    const toggleReviewMode = () => {
        setIsReviewMode(!isReviewMode);
    };

    const collectionId = useMemo(() => {
        if (id) return Number(id);
        const learningList = collections?.filter((c: CollectionProgress) => {
            return c.status === 'in_progress';
        });
        return learningList?.[0]?.collection_id;
    }, [id, collections, mode]);

    // Tách fetchQuiz ra ngoài để có thể gọi lại
    const fetchQuiz = useCallback(async () => {
        if (!collectionId) return;
        let quizMode: QuizMode;

        if (typeof mode === 'string') {
            quizMode = mode as QuizMode;
        } else {
            quizMode = isReviewMode ? 'mixed' : 'old';
        }
        const res = await quizService.getRandomQuizOfCollection(collectionId, quizMode);
        if (res?.length > 0) {
            setQuizList(res);
            setCurrentIndex(0);
        }
    }, [collectionId, mode, isReviewMode]);

    useEffect(() => {
        fetchQuiz();
    }, [collectionId, isReviewMode]);

    useEffect(() => {
        if (!collectionId || !collections) return;
        const collection = collections.find((c: CollectionProgress) => c.collection_id === collectionId);
        setCurrentCollection(collection);
    }, [collectionId, collections]);

    const handleOpenListMenu = useCallback(() => {
        leftRef.current?.present();
    }, []);

    const handleCloseListMenu = useCallback(() => {
        leftRef.current?.close();
    }, []);

    const handleOpenSettingBox = useCallback(() => {
        rightRef.current?.present();
    }, []);

    const handleCloseSettingBox = useCallback(() => {
        rightRef.current?.close();
    }, []);

    const handleSkip = () => {
        if (currentIndex < quizList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // TODO: call api to get more quiz
            fetchQuiz();
        }
    };

    const handleMasteredWord = async () => {
        try {
            let collectionId = id ? Number(id) : collections?.[0]?.collection_id;
            if (!collectionId) return;
            const res = await collectionService.changeStatusOfCard(collectionId, quizList[currentIndex].id, 'mastered');
            if (res) {
                if (res?.collectionCompleted) {
                    showSuccessToast('Congratulations! You have completed this collection.');
                    dispatch(changeStatus({ id: collectionId, status: 'completed' }));
                    dispatch(increaseMasteredCount({ id: collectionId }));
                    router.replace('/');
                    return;
                }
                dispatch(increaseMasteredCount({ id: collectionId }));
                handleSkip();
            }
        } catch (error) {
            showErrorToast(error);
        }
    };

    const handleSubmitAnswer = async (quizType: QuestionType, cardId: number, rating?: 'E' | 'M' | 'H') => {
        try {
            let collectionId = id ? Number(id) : collections?.[0]?.collection_id;
            if (!collectionId) return;
            const res = await quizService.answer(collectionId, cardId, quizType, rating);

            if (res) {
                dispatch(answerCard({ id: collectionId }));
                handleSkip();
            }
        } catch (error) {
            showErrorToast(error);
        }
    };

    const learned = currentCollection?.today_learned_count ?? 0;
    const total = currentCollection?.task_count ?? 1;
    const progress = learned / total;

    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    if (!collectionId)
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText type="subtitle">Have no quiz in this collection</ThemedText>
            </SafeAreaView>
        );

    return (
        <SafeAreaView style={[isReviewMode && { backgroundColor: '#D9E9CF' }, { paddingHorizontal: 20, flex: 1 }]}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]} onPress={handleOpenListMenu}>
                    <HugeiconsIcon icon={BookOpen02Icon} size={24} color={textColor} />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={styles.headerName} numberOfLines={1} ellipsizeMode="tail">
                    {currentCollection ? currentCollection?.collection?.name : 'Name'}
                </ThemedText>
                <TouchableOpacity style={[styles.btnWrap, { backgroundColor: white }]} onPress={handleOpenSettingBox}>
                    <HugeiconsIcon icon={Settings01Icon} size={24} color={textColor} />
                </TouchableOpacity>
            </View>

            {quizList.length > 0 && (
                <View style={styles.progress}>
                    <ThemedText style={styles.progressNumber}>{currentCollection?.today_learned_count}</ThemedText>
                    <Bar
                        style={{ flex: 1, marginHorizontal: 12, borderRadius: 30 }}
                        color={progress > 1 ? '#2196f3' : '#4caf50'}
                        height={12}
                        progress={progress}
                        width={null}
                        borderWidth={0}
                        unfilledColor="rgba(198, 198, 198, 0.4)"
                    />
                    <ThemedText style={[styles.progressNumber]}>{currentCollection?.task_count}</ThemedText>
                </View>
            )}

            {quizList.length > 0 ? (
                <View style={styles.flashcards}>
                    {quizList.length > 0 && <RandomQuiz quiz={quizList[currentIndex]} onSubmit={handleSubmitAnswer} />}
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ThemedText type="subtitle" style={{ padding: 16 }}>
                        Have no quiz in this collection
                    </ThemedText>
                    <Button type="link" onPress={() => router.replace('/')}>
                        Go to home
                    </Button>
                </View>
            )}

            {quizList.length > 0 && (
                <View style={styles.btnBox}>
                    {!(mode === 'recap') && (
                        <Button type="link" onPress={handleMasteredWord}>
                            🧠 Đã ghi nhớ
                        </Button>
                    )}
                    <Button type="link" textStyle={{ color: textColor }} onPress={handleSkip}>
                        Skip →
                    </Button>
                </View>
            )}

            <ModalBottomSheet bottomSheetModalRef={leftRef}>
                <LearningList selectedIndex={currentCollection?.collection_id} close={handleCloseListMenu} />
            </ModalBottomSheet>

            <ModalBottomSheet bottomSheetModalRef={rightRef}>
                <QuizSetting
                    collectionId={currentCollection?.collection_id}
                    onClose={handleCloseSettingBox}
                    onToggle={toggleReviewMode}
                    reviewMode={isReviewMode}
                    isShowReviewMode={!(mode === 'recap')}
                />
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
        textTransform: 'capitalize',
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
