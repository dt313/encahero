import ReduxActionType from '@/types/redux-action-type';

import { CollectionProgress } from '../reducers/learning-list-reducer';

export const INIT_LEARNING_LIST = 'INIT_LEARNING_LIST';
export const REGISTER_COLLECTION = 'REGISTER_COLLECTION';
export const UPDATE_TASK_COUNT = 'UPDATE_TASK_COUNT';
export const INCREASE_MASTERED_COUNT = 'INCREASE_MASTERED_COUNT';
export const DECREASE_MASTERED_COUNT = 'DECREASE_MASTERED_COUNT';
export const ANSWER_CARD = 'ANSWER_CARD';
export const MASTER_CARD = 'MASTER_CARD';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const CONTINUE_COLLECTION = 'CONTINUE_COLLECTION';
export const initLearningList = (payload: CollectionProgress[]): ReduxActionType => {
    return {
        type: INIT_LEARNING_LIST,
        payload,
    };
};

export const register = (payload: CollectionProgress): ReduxActionType => {
    return {
        type: REGISTER_COLLECTION,
        payload,
    };
};

export const updateTaskCount = (payload: { id: number; task_count: number }): ReduxActionType => {
    return {
        type: UPDATE_TASK_COUNT,
        payload,
    };
};

export const increaseMasteredCount = (payload: { collection: any; isNew: boolean }): ReduxActionType => {
    return {
        type: INCREASE_MASTERED_COUNT,
        payload,
    };
};

export const decreaseMasteredCount = (payload: number): ReduxActionType => {
    return {
        type: DECREASE_MASTERED_COUNT,
        payload,
    };
};

export const answerCard = (payload: { collection: any; isNew: boolean }): ReduxActionType => {
    return {
        type: ANSWER_CARD,
        payload,
    };
};

export const changeStatus = (payload: { id: number; status: string }): ReduxActionType => {
    return {
        type: CHANGE_STATUS,
        payload,
    };
};
