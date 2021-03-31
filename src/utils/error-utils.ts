import {setAppError, setAppErrorActionType, setAppStatus, setAppStatusActionType} from "../App/app-reducer";
import {ResponseTaskType} from "../API/task-api";
import {Dispatch} from "redux";
import {TodolistDomainType} from "../features/TodolistsList/todolists_reducer";

export const handleServerAppError = <D>(data: ResponseTaskType<D>, dispatch: Dispatch<setAppErrorActionType|setAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}
export const handleNetworkAppError = (error: {message: string}, dispatch: Dispatch<setAppErrorActionType|setAppStatusActionType>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}
