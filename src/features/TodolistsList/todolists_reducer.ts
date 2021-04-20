import {todolistAPI, TodolistType} from "../../API/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorActionType, setAppStatus, setAppStatusActionType} from "../../App/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        }
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistDomainType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTitleTodolistAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeFilterTodolistAC = (id: string, filter: FilterValueType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
export const setTodolistsAC = (todolists: Array<TodolistDomainType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)


//thunks
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatus('succeeded'))
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTodolistsTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatus('succeeded'))
            handleServerAppError(res.data, dispatch)
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const addTodolistsTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
            handleServerAppError(res.data, dispatch)
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const changeTitleTodolistsTC = (id: string, title: string) => (dispatch: ThunkDispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(id, title))
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
type ThunkDispatch = Dispatch<ActionType | setAppStatusActionType | setAppErrorActionType>
type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodolistsActionType


