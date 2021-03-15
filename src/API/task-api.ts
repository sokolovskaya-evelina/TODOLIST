import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fe3cd028-48b8-4f24-aace-482e17e6fa4c'
    }
})


export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: string
    addedDate: string
}

type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
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


export const taskAPI = {
    getTasks(todolistId: string) {
        return  instance.get<GetTasksResponse>(`${todolistId}/tasks`)
    },
    deleteTasks(taskId: string, todolistId: string) {
        return  instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<TaskType>>(`${todolistId}/tasks`, {title: title})
    },
    updateTasks(taskId: string, todolistId: string, title: string) {
        return instance.put<ResponseTaskType<UpdateTaskType>>(`${todolistId}/tasks/${taskId}`, {title: title})
    }
}
