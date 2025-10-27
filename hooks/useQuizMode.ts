import { useMemo } from 'react';

import checkNewMode from '@/helper/check-new-mode';
import type { CollectionProgress } from '@/store/reducers/learning-list-reducer';

import { QuizMode } from '@/services/quiz';

interface UseQuizModeProps {
    currentCollection?: CollectionProgress | null;
    isReviewMode?: boolean;
}

export function useQuizMode({ currentCollection, isReviewMode }: UseQuizModeProps) {
    const quizMode = useMemo<QuizMode | null>(() => {
        if (!currentCollection) return null;

        if (currentCollection.status === 'completed') return 'recap';

        if (checkNewMode(currentCollection)) {
            return 'new';
        }
        if (isReviewMode) {
            return 'mixed';
        }

        return 'old';
    }, [isReviewMode, currentCollection]);

    return quizMode;
}
