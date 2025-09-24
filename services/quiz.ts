import instance from '@/config/axios';

import { QuestionType } from '@/components/random-quiz';

export const getRandomQuizOfCollection = async (id: number) => {
    try {
        const res = await instance.get(`/quiz/${id}`);
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
) => {
    try {
        const res = await instance.post(`quiz/${collectionId}/answer/${cardId}`, {
            questionType,
            ratingValue: rating,
        });

        return res.data;
    } catch (error: any) {
        throw error;
    }
};
