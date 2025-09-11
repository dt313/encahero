import ReduxActionType from '@/types/redux-action-type';

import { TOAST_DURATION } from '@/constants';

import { generateRandomId } from '@/utils';

export const ADD_TOAST = 'ADD_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export const addToast = (payload: object): ReduxActionType => {
    return {
        type: ADD_TOAST,
        payload: {
            id: generateRandomId(),
            type: 'info',
            title: 'info',
            message: 'Toast',
            duration: TOAST_DURATION,
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
