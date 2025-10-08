import ReduxActionType from '@/types/redux-action-type';

import {
    ANSWER_CARD,
    CHANGE_STATUS,
    CONTINUE_COLLECTION,
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
    today_learned_count: number;
    mastered_card_count: number;
    learned_card_count: number;
    today_new_count: number;
    daily_new_limit: number;
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
                        item.collection_id === action.payload.id
                            ? { ...item, mastered_card_count: item.mastered_card_count + 1 }
                            : item,
                    ),
            };

        case ANSWER_CARD:
            return {
                ...state,
                collections:
                    state.collections.length > 0 &&
                    state.collections.map((item) => {
                        if (item.collection_id === action.payload.id) {
                            if (action.payload.isNew) {
                                return {
                                    ...item,
                                    today_learned_count: item.today_learned_count + 1,
                                    today_new_count: item.today_new_count + 1,
                                    learned_card_count: item.today_learned_count + 1,
                                };
                            } else return { ...item, today_learned_count: item.today_learned_count + 1 };
                        } else return item;
                    }),
            };

        case CHANGE_STATUS:
            return {
                ...state,
                collections: state.collections.map((item) =>
                    item.collection_id === action.payload.id
                        ? { ...item, status: action.payload.status, stopped_at: new Date().toISOString() }
                        : item,
                ),
            };

        case CONTINUE_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, action.payload],
            };
        default:
            return state;
    }
}
