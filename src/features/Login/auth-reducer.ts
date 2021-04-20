import {Dispatch} from 'redux'
import {setAppErrorActionType, setAppStatus, setAppStatusActionType} from "../../App/app-reducer";
import {authAPI, LoginParamsType} from "../../API/auth-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {
                ...state,
                isLoggedIn: action.value
            }
        default:
            return state
    }
}

// actions
export const setIsLoggedIn = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error => {
            handleNetworkAppError(error, dispatch)
        }))
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error => {
            handleNetworkAppError(error, dispatch)
        }))
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedIn> | setAppStatusActionType | setAppErrorActionType