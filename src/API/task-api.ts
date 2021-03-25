import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fe3cd028-48b8-4f24-aace-482e17e6fa4c'
    }
})

//API
export const taskAPI = {
    getTasks(todolistId: string) {
        return  instance.get<GetTasksResponse>(`${todolistId}/tasks`)
    },
    deleteTasks(taskId: string, todolistId: string) {
        return  instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{item: TaskType}>>(`${todolistId}/tasks`, {title: title})
    },
    updateTasks(taskId: string, todolistId: string, model:UpdateTaskModelType) {
        return instance.put<ResponseTaskType<TaskType>>(`${todolistId}/tasks/${taskId}`, model)
    }
}

//types
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskStatuses  {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
type ResponseTaskType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}