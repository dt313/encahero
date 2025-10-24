import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';

import checkNewMode from '@/helper/check-new-mode';
import { answerCard, changeStatus, increaseMasteredCount } from '@/store/action/learning-list-action';
import { RootState } from '@/store/reducers';
import { CollectionProgress } from '@/store/reducers/learning-list-reducer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import CongratsModal from '@/components/congratulation-modal';
import LearningList from '@/components/learning-list';
import ModalBottomSheet from '@/components/modal-bottom-sheet';
import QuizSetting from '@/components/quiz-setting';
import NoCollection from '@/components/quiz-ui/no-collection';
import NoQuiz from '@/components/quiz-ui/no-quiz';
import QuizAction from '@/components/quiz-ui/quiz-action';
import QuizHeader from '@/components/quiz-ui/quiz-header';
import QuizProgress from '@/components/quiz-ui/quiz-progress';
import RandomQuiz, { QuestionType } from '@/components/random-quiz';
import ScreenWrapper from '@/components/screen-wrapper';

import { useBottomSheet } from '@/hooks/useBottomSheet';
import { useFetchQuiz } from '@/hooks/useFetchQuiz';
import { useThemeColor } from '@/hooks/useThemeColor';
import useToast from '@/hooks/useToast';

import { collectionService, quizService } from '@/services';
import type { QuizMode } from '@/services/quiz';

function QuizScreen() {
    const { ref: leftRef, open: openList, close: closeList } = useBottomSheet();
    const { ref: rightRef, open: openSetting, close: closeSetting } = useBottomSheet();

    const dispatch = useDispatch();

    const collections = useSelector((state: RootState) => state.learningList.collections);
    const { id, mode } = useLocalSearchParams();
    const { showErrorToast } = useToast();

    const [isReviewMode, setIsReviewMode] = useState(false);
    const [showCongratsModal, setShowCongratsModal] = useState(false);
    const [currentCollection, setCurrentCollection] = useState<CollectionProgress | null>(null);

    // Determine quiz mode
    const quizMode = useMemo<QuizMode | null>(() => {
        if (!currentCollection) return null;
        if (checkNewMode(currentCollection)) {
            return 'new';
        } else if (typeof mode === 'string') return mode as QuizMode;
        return isReviewMode ? 'mixed' : 'old';
    }, [mode, isReviewMode, currentCollection]);

    // Determine current collection ID
    const collectionId = useMemo(() => {
        if (!collections) return undefined;

        // Kiểm tra nếu có id trong URL
        if (id) {
            const current = collections.find((c: CollectionProgress) => c.collection_id === Number(id));
            if (current && current.status !== 'stopped') {
                return Number(id);
            }
        }

        const activeCollection = collections.find((c: CollectionProgress) => c.status === 'in_progress');
        return activeCollection?.collection_id;
    }, [id, collections]);

    const { quizList, currentIndex, setCurrentIndex, fetchQuiz } = useFetchQuiz(collectionId, quizMode);

    console.log(
        quizMode,
        collectionId,
        currentCollection?.collection_id,
        currentCollection?.collection?.name,
        quizList[0]?.en_word,
    );

    //  Set current collection
    useEffect(() => {
        if (!collectionId || !collections) {
            setCurrentCollection(null);
            return;
        }
        const collection = collections.find(
            (c: CollectionProgress) => c.collection_id === collectionId && c.status !== 'stopped',
        );
        console.log('Current collection set to:', collection, collectionId);
        setCurrentCollection(collection);
    }, [collectionId, collections]);

    const handleSkip = () => {
        if (currentIndex < quizList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            fetchQuiz();
        }
    };

    const toggleReviewMode = () => {
        setIsReviewMode(!isReviewMode);
    };

    const handleMasteredWord = useCallback(async () => {
        try {
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
    }, [collectionId, collections, currentIndex, quizList, quizMode, dispatch]);

    const handleSubmitAnswer = useCallback(
        async (quizType: QuestionType, cardId: number, rating?: 'E' | 'M' | 'H') => {
            try {
                if (!collectionId) return;
                const res = await quizService.answer(collectionId, cardId, quizType, rating, quizMode === 'new');

                if (res) {
                    dispatch(answerCard({ id: collectionId, isNew: quizMode === 'new' }));
                    handleSkip();
                }
            } catch (error) {
                showErrorToast(error);
            }
        },
        [collectionId, collections, quizMode, dispatch],
    );

    const reviewBg = useThemeColor({}, 'reviewBg');

    if (!currentCollection) return <NoCollection />;

    return (
        <ScreenWrapper>
            <SafeAreaView style={[isReviewMode && { backgroundColor: reviewBg }, { paddingHorizontal: 20, flex: 1 }]}>
                <QuizHeader
                    collectionName={currentCollection?.collection?.name}
                    onOpenList={openList}
                    onOpenSetting={openSetting}
                />

                {quizList.length > 0 && (
                    <QuizProgress
                        learned={currentCollection?.today_learned_count ?? 0}
                        total={currentCollection?.task_count ?? 1}
                    />
                )}

                {quizList.length > 0 ? (
                    <RandomQuiz
                        quiz={quizList[currentIndex]}
                        onSubmit={handleSubmitAnswer}
                        isNew={quizMode === 'new'}
                    />
                ) : (
                    <NoQuiz />
                )}

                {quizList.length > 0 && (
                    <QuizAction
                        status={currentCollection?.status}
                        onMasterWord={handleMasteredWord}
                        onSkip={handleSkip}
                        isShowMasteredButton={!(mode === 'recap')}
                    />
                )}

                <ModalBottomSheet bottomSheetModalRef={leftRef}>
                    <LearningList selectedIndex={currentCollection?.collection_id} close={closeList} />
                </ModalBottomSheet>

                <ModalBottomSheet bottomSheetModalRef={rightRef}>
                    <QuizSetting
                        collectionId={currentCollection?.collection_id}
                        onClose={closeSetting}
                        onToggle={toggleReviewMode}
                        reviewMode={isReviewMode}
                        isShowReviewMode={!(mode === 'recap' && currentCollection?.status === 'completed')}
                    />
                </ModalBottomSheet>

                <CongratsModal visible={showCongratsModal} onClose={() => setShowCongratsModal(false)} />
            </SafeAreaView>
        </ScreenWrapper>
    );
}

export default QuizScreen;
