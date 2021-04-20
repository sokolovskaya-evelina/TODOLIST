import {Dispatch} from "redux";
import {authAPI} from "../API/auth-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//actions
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

//thunks
export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
        } else {

        }
        dispatch(setAppInitialized(true))
    })
}

//types
export type setAppErrorActionType = ReturnType<typeof setAppError>;
export type setAppStatusActionType = ReturnType<typeof setAppStatus>;
export type setAppInitializedType = ReturnType<typeof setAppInitialized>;
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
type ActionsType = setAppErrorActionType
    | setAppStatusActionType
    | setAppInitializedType