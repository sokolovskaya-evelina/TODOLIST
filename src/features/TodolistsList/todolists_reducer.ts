import {todolistAPI, TodolistType} from "../../API/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
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
export const setTodolistsAC = (todolists: Array<TodolistDomainType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTitleTodolistsTC = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(id, title))
        })
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType }
type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | SetTodolistsActionType


