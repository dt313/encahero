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
import CongratsModal from '@/components/congratulation-modal';
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
    const collections = useSelector((state: RootState) => state.learningList.collections);
    const { id, mode } = useLocalSearchParams();
    const { showErrorToast } = useToast();

    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCollection, setCurrentCollection] = useState<CollectionProgress>();
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [showCongratsModal, setShowCongratsModal] = useState(false);

    const toggleReviewMode = () => {
        setIsReviewMode(!isReviewMode);
    };

    const collectionId = useMemo(() => {
        if (id) return Number(id);
        const learningList = collections?.filter((c: CollectionProgress) => {
            return c.status === 'in_progress';
        });
        return learningList?.[0]?.collection_id;
    }, [id, collections]);

    const quizMode = useMemo<QuizMode | null>(() => {
        if (!currentCollection) return null;
        if (
            (currentCollection?.learned_card_count === 0 ||
                currentCollection?.learned_card_count < currentCollection.daily_new_limit) &&
            currentCollection.learned_card_count < currentCollection.collection.card_count
        )
            return 'new';
        if (
            currentCollection?.today_new_count < currentCollection?.daily_new_limit &&
            currentCollection.collection.card_count > currentCollection.learned_card_count &&
            (currentCollection?.today_learned_count >= currentCollection?.task_count ||
                (currentCollection.learned_card_count === currentCollection.mastered_card_count &&
                    currentCollection.mastered_card_count < currentCollection.collection.card_count))
        ) {
            return 'new';
        } else if (typeof mode === 'string') return mode as QuizMode;
        return isReviewMode ? 'mixed' : 'old';
    }, [mode, isReviewMode, currentCollection]);

    const fetchQuiz = useCallback(async () => {
        if (!collectionId || !quizMode) return;

        const res = await quizService.getRandomQuizOfCollection(collectionId, quizMode);
        if (res?.length > 0) {
            setQuizList(res);
            setCurrentIndex(0);
        } else {
            setQuizList([]);
        }
    }, [collectionId, isReviewMode, quizMode]);

    useEffect(() => {
        fetchQuiz();
    }, [collectionId, quizMode]);

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
                    dispatch(changeStatus({ id: collectionId, status: 'completed' }));
                    dispatch(increaseMasteredCount({ id: collectionId, isNew: quizMode === 'new' }));
                    // router.replace('/');
                    setShowCongratsModal(true);
                    return;
                }
                dispatch(increaseMasteredCount({ id: collectionId, isNew: quizMode === 'new' }));
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
            const res = await quizService.answer(collectionId, cardId, quizType, rating, quizMode === 'new');

            if (res) {
                dispatch(answerCard({ id: collectionId, isNew: quizMode === 'new' }));
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
                    {quizList.length > 0 && (
                        <RandomQuiz
                            quiz={quizList[currentIndex]}
                            onSubmit={handleSubmitAnswer}
                            isNew={quizMode === 'new'}
                        />
                    )}
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
                <View
                    style={[
                        styles.btnBox,
                        currentCollection?.status === 'completed' && { flexDirection: 'row-reverse' },
                    ]}
                >
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
                    isShowReviewMode={!(mode === 'recap' && currentCollection?.status === 'completed')}
                />
            </ModalBottomSheet>

            <CongratsModal visible={showCongratsModal} onClose={() => setShowCongratsModal(false)} />
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

    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalBox: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
});

export default QuizScreen;
