import ReduxActionType from '@/types/redux-action-type';

import { INIT_LEARNING_LIST } from '../action/learning-list-action';

export interface CollectionProgress {
    id: number;
    user_id: number;
    collection_id: number;
    collection: {
        id: number;
        name: string;
        card_count: number;
    };
    task_count: number;
    last_reviewed_at: string | null;
    current_review_count: number;
    today_learned_count: number;
    started_at: string | null;
    status: string;
    stopped_at: string | null;
    completed_at: string | null;
}

interface LearningListState {
    collections: CollectionProgress[];
}
const initialState: LearningListState = {
    collections: [],
};

export default function learningListReducer(state = initialState, action: ReduxActionType) {
    switch (action.type) {
        case INIT_LEARNING_LIST:
            return {
                ...state,
                collections: action.payload,
            };

        default:
            return state;
    }
}
