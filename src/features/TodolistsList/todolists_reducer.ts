import {todolistAPI, TodolistType} from "../../API/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus} from "../../App/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []


export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistDomainType }>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTitleTodolistAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeFilterTodolistAC: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistDomainType> }>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))

        },

    }
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTitleTodolistAC,
    changeFilterTodolistAC,
    changeTodolistEntityStatusAC,
    setTodolistsAC
} = slice.actions

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({id: todolistId}))
            dispatch(setAppStatus({status: 'succeeded'}))
            handleServerAppError(res.data, dispatch)
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
            handleServerAppError(res.data, dispatch)
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const changeTitleTodolistsTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC({id, title}))
            handleServerAppError(res.data, dispatch)
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType, entityStatus: RequestStatusType }




