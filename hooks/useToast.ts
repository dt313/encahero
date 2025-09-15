import { addToast } from '@/store/action/toast-action';
import { useDispatch } from 'react-redux';

import { TOAST_POSITION, TOAST_TYPE } from '@/constants';

function useToast() {
    const dispatch = useDispatch();

    const showErrorToast = (error: any, position?: string, title?: string) => {
        let message: string;

        if (typeof error === 'string') {
            message = error;
        } else if (error instanceof Error) {
            message = error.message;
        } else if (error?.message) {
            message = error.message;
        } else {
            message = 'Unexpected error';
        }

        dispatch(
            addToast({
                type: TOAST_TYPE.ERROR,
                title: title || TOAST_TYPE.ERROR,
                position: TOAST_POSITION.TOP || position,
                message,
            }),
        );
    };

    const showSuccessToast = (message: string, position?: string, title?: string) => {
        dispatch(
            addToast({
                type: TOAST_TYPE.SUCCESS,
                title: title || TOAST_TYPE.SUCCESS,
                position: TOAST_POSITION.TOP || position,
                message,
            }),
        );
    };

    const showWarningToast = (message: string, position?: string, title?: string) => {
        dispatch(
            addToast({
                type: TOAST_TYPE.WARNING,
                title: title || TOAST_TYPE.WARNING,
                position: TOAST_POSITION.TOP || position,
                message,
            }),
        );
    };

    const showInfoToast = (message: string, position?: string, title?: string) => {
        dispatch(
            addToast({
                type: TOAST_TYPE.INFO,
                title: title || TOAST_TYPE.INFO,
                message,
                position: TOAST_POSITION.TOP || position,
            }),
        );
    };

    return {
        showErrorToast,
        showWarningToast,
        showInfoToast,
        showSuccessToast,
    };
}

export default useToast;
