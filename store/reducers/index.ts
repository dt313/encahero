import authReducer from './auth-reducer';
import toastReducer from './toast-reducer';

const { combineReducers } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
