import axios from 'axios'
import {TodolistDomainType} from "../features/TodolistsList/todolists_reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fe3cd028-48b8-4f24-aace-482e17e6fa4c'
    }
})

//API
export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistDomainType>>(`todo-lists/`)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistDomainType }>>(`todo-lists/`, {title: title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    }
}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
