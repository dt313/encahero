import ReduxActionType from '@/types/redux-action-type';

import * as storage from '@/utils/storage';

import { INIT_AUTO_SOUND, TOGGLE_AUTO_SOUND } from '../action/sound-action';

export default function soundReducer(state = { autoSound: true }, action: ReduxActionType) {
    switch (action.type) {
        case TOGGLE_AUTO_SOUND:
            const newAutoSound = !state.autoSound;
            console.log('New auto sound setting:', newAutoSound);
            storage.setAutoSound(newAutoSound);
            return {
                ...state,
                autoSound: newAutoSound,
            };
        case INIT_AUTO_SOUND:
            return {
                ...state,
                autoSound: action.payload,
            };
        default:
            return state;
    }
}
