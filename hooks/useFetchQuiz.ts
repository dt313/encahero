import { useCallback, useEffect, useState } from 'react';

import type { Quiz } from '@/types/quiz';

import useToast from '@/hooks/useToast';

import { quizService } from '@/services';
import { QuizMode } from '@/services/quiz';

export function useFetchQuiz(collectionId?: number, quizMode?: QuizMode | null) {
    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { showErrorToast } = useToast();

    const fetchQuiz = useCallback(async () => {
        if (!collectionId || !quizMode) return;

        try {
            const res = await quizService.getRandomQuizOfCollection(collectionId, quizMode);
            setQuizList(res?.length ? res : []);
            setCurrentIndex(0);
        } catch (err) {
            showErrorToast(err);
        }
    }, [collectionId, quizMode]);

    // Tự động fetch khi collectionId hoặc quizMode thay đổi
    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    return { quizList, currentIndex, setCurrentIndex, fetchQuiz };
}
