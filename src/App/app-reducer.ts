import {Dispatch} from "redux";
import {authAPI} from "../API/auth-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppError, setAppStatus, setAppInitialized} = slice.actions

//thunks
export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}))
        } else {

        }
        dispatch(setAppInitialized({isInitialized: true}))
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