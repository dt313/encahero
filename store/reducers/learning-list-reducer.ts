import ReduxActionType from '@/types/redux-action-type';

import {
    ANSWER_CARD,
    INCREASE_MASTERED_COUNT,
    INIT_LEARNING_LIST,
    REGISTER_COLLECTION,
    UPDATE_TASK_COUNT,
} from '../action/learning-list-action';

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
    mastered_card_count: number;
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

        case REGISTER_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, action.payload],
            };
        case UPDATE_TASK_COUNT:
            return {
                ...state,
                collections:
                    state.collections.length > 0 &&
                    state.collections.map((item) =>
                        item.id === action.payload.id ? { ...item, task_count: action.payload.task_count } : item,
                    ),
            };

        case INCREASE_MASTERED_COUNT:
            return {
                ...state,
                collections:
                    state.collections.length > 0 &&
                    state.collections.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, mastered_card_count: item.mastered_card_count + 1 }
                            : item,
                    ),
            };

        case ANSWER_CARD:
            return {
                ...state,
                collections:
                    state.collections.length > 0 &&
                    state.collections.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, today_learned_count: item.today_learned_count + 1 }
                            : item,
                    ),
            };

        default:
            return state;
    }
}
