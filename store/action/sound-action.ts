import ReduxActionType from '@/types/redux-action-type';
import { Dispatch } from '@reduxjs/toolkit';

import { storage } from '@/utils';

export const TOGGLE_AUTO_SOUND = 'TOGGLE_AUTO_SOUND';
export const INIT_AUTO_SOUND = 'INIT_AUTO_SOUND';

export const initializeSoundSetting = () => async (dispatch: Dispatch<ReduxActionType>) => {
    try {
        const isAuto = await storage.getAutoSound();
        console.log({ isAuto });
        if (isAuto === 'false' || isAuto === 'true') {
            dispatch(initAutoSound(isAuto === 'true'));
            return;
        }
        if (!isAuto) {
            await storage.setAutoSound(true);
            dispatch(initAutoSound(true));
        }
    } catch (error) {
        throw error;
    }
};

export const toggleAutoPlay = (): ReduxActionType => {
    return {
        type: TOGGLE_AUTO_SOUND,
    };
};

export const initAutoSound = (payload: boolean): ReduxActionType => {
    return {
        type: INIT_AUTO_SOUND,
        payload,
    };
};
