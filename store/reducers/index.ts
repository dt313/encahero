import authReducer from './auth-reducer';
import learningListReducer from './learning-list-reducer';
import soundReducer from './sound-reducer';
import toastReducer from './toast-reducer';

const { combineReducers } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    learningList: learningListReducer,
    sound: soundReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
