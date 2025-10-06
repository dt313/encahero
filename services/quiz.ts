import instance from '@/config/axios';

import { QuestionType } from '@/components/random-quiz';

export type QuizMode = 'old' | 'new' | 'mixed' | 'recap';

export const getRandomQuizOfCollection = async (id: number, mode: QuizMode = 'old') => {
    try {
        const res = await instance.get(`/quiz/${id}?mode=${mode}`);
        return res.data;
    } catch (error: any) {
        throw error;
    }
};

export const answer = async (
    collectionId: number,
    cardId: number,
    questionType: QuestionType,
    rating?: 'E' | 'M' | 'H',
    isNew: boolean = false,
) => {
    try {
        const res = await instance.post(`quiz/${collectionId}/answer/${cardId}`, {
            questionType,
            ratingValue: rating,
            isNew,
        });

        return res.data;
    } catch (error: any) {
        throw error;
    }
};
