import ReduxActionType from '@/types/redux-action-type';
import ToastType from '@/types/toast-type';

import { ADD_TOAST, HIDE_TOAST } from '../action/toast-action';

const toast: ToastType = {
    id: '1',
    title: 'Info',
    type: 'info',
    message: 'Hello World',
    duration: 3000,
    position: 'bottom',
    visible: true,
};
const initialState: {
    list: ToastType[];
} = {
    list: [],
};
function toastReducer(state = initialState, action: ReduxActionType) {
    switch (action.type) {
        case ADD_TOAST:
            return {
                list: [...state.list, action.payload],
            };
        case HIDE_TOAST:
            const filterToast =
                state.list?.length > 0 &&
                state.list.filter((toast) => {
                    return toast.id !== action.payload;
                });

            return {
                list: filterToast,
            };

        default:
            return state;
    }
}

export default toastReducer;
