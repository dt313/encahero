import ReduxActionType from "@/types/redux-action-type"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (payload: any) : ReduxActionType=> {
    return {
        type: LOGIN,
        payload,
    }
}

export const logout = (): ReduxActionType=> {
    return {
        type: LOGOUT
    }
}
