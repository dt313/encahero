import ReduxActionType from '@/types/redux-action-type';

import { generateRandomId } from '@/utils';

export const ADD_TOAST = 'ADD_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
const DURATION = 3000;
export const addToast = (payload: object): ReduxActionType => {
    return {
        type: ADD_TOAST,
        payload: {
            id: generateRandomId(),
            type: 'info',
            title: 'info',
            message: 'Hello World',
            duration: DURATION,
            position: 'bottom',
            ...payload,
        },
    };
};

export const hideToast = (payload: string): ReduxActionType => {
    return {
        type: HIDE_TOAST,
        payload,
    };
};
