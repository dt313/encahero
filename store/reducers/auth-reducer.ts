import ReduxActionType from '@/types/redux-action-type';

import { LOGIN, LOGOUT, UPDATE_USER } from '../action/auth-action';

const initialState = {
    isLoggedIn: false,
    user: {},
};

export default function authReducer(state = initialState, action: ReduxActionType) {
    switch (action.type) {
        case LOGIN:
            const user = action.payload || {};
            return {
                ...state,
                isLoggedIn: !!user,
                user,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
            };

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
}
