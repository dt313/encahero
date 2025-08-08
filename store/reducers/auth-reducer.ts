import ReduxActionType from '@/types/redux-action-type';

import { LOGIN, LOGOUT } from '../action/auth-action';

const initialState = {
    isLoggedIn: false,
    user: {},
};

export default function authReducer(state = initialState, action: ReduxActionType) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
                user: {},
            };

        default:
            return state;
    }
}
