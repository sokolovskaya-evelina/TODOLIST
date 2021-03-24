import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../API/todolist-api";
import {Dispatch} from "redux";

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistDomainType
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistDomainType>
}

const initialState: Array<TodolistDomainType> = []
export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title

            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todolistFilter = state.find(tl => tl.id === action.id)
            if (todolistFilter) {
                todolistFilter.filter = action.filter
            }
            return [...state]
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (todolist: TodolistDomainType): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    }
}
export const changeTitleTodolistAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }
}
export const changeFilterTodolistAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter,
    }
}

export const setTodolistsAC = (todolists: Array<TodolistDomainType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsTC = () =>{
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistsTC = (todolistId: string) =>{
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistsTC = (title: string) =>{
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTitleTodolistsTC = (id: string, title: string) =>{
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTitleTodolistAC(id,title))
            })
    }
}

