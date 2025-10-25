import { ReviewAnswerType } from '@/types/quiz';

export const TOAST_TYPE = {
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
};

export const TOAST_DURATION = 3000;
export const TOAST_POSITION = {
    BOTTOM: 'bottom',
    TOP: 'top',
};

export const REVIEW_ANSWERS: ReviewAnswerType[] = [
    {
        title: 'Dễ',
        name: 'E',
        icon: '😊',
    },

    {
        title: 'Trung bình',
        name: 'M',
        icon: '🤔',
    },

    {
        title: 'Khó',
        name: 'H',
        icon: '😡',
    },
];
