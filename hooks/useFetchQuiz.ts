import { useCallback, useEffect, useRef, useState } from 'react';

import type { Quiz } from '@/types/quiz';

import useToast from '@/hooks/useToast';

import { quizService } from '@/services';
import { QuizMode } from '@/services/quiz';

export function useFetchQuiz(collectionId?: number, quizMode?: QuizMode | null) {
    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { showErrorToast } = useToast();

    const quizListLength = useRef<number>(0);

    const fetchQuiz = async () => {
        if (!collectionId || !quizMode) return;

        try {
            const res = await quizService.getRandomQuizOfCollection(collectionId, quizMode);
            setQuizList(res?.length ? res : []);
            quizListLength.current = res?.length ? res.length : 0;
            setCurrentIndex(0);
        } catch (err) {
            showErrorToast(err);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [collectionId, quizMode]);

    const handleSkip = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 < quizListLength.current) {
                return prevIndex + 1;
            } else {
                fetchQuiz(); // fetch mới khi hết quiz
                return 0;
            }
        });
    }, [quizListLength]);

    return { quizList, currentIndex, fetchQuiz, handleSkip, setCurrentIndex };
}
