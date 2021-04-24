import {Dispatch} from 'redux'
import {setAppStatus} from "../../App/app-reducer";
import {authAPI, LoginParamsType} from "../../API/auth-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error => {
            handleNetworkAppError(error, dispatch)
        }))
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error => {
            handleNetworkAppError(error, dispatch)
        }))
}

// types
