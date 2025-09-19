import ReduxActionType from '@/types/redux-action-type';

import { CollectionProgress } from '../reducers/learning-list-reducer';

export const INIT_LEARNING_LIST = 'INIT_LEARNING_LIST';
export const initLearningList = (payload: CollectionProgress[]): ReduxActionType => {
    return {
        type: INIT_LEARNING_LIST,
        payload,
    };
};
