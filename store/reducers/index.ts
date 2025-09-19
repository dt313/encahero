import authReducer from './auth-reducer';
import learningListReducer from './learning-list-reducer';
import toastReducer from './toast-reducer';

const { combineReducers } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    learningList: learningListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
