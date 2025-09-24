import ReduxActionType from '@/types/redux-action-type';

import { CollectionProgress } from '../reducers/learning-list-reducer';

export const INIT_LEARNING_LIST = 'INIT_LEARNING_LIST';
export const REGISTER_COLLECTION = 'REGISTER_COLLECTION';
export const UPDATE_TASK_COUNT = 'UPDATE_TASK_COUNT';
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
