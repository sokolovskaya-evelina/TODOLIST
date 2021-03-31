import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists_reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../API/task-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../App/store";
import {setAppError, setAppErrorActionType, setAppStatus, setAppStatusActionType} from "../../App/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolist.id]: []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'))
    taskAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatus('succeeded'))
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    taskAPI.deleteTasks(taskId, todolistId)
        .then((res) => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
            handleServerAppError(res.data, dispatch)
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus('loading'))
    taskAPI.createTasks(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error => {
            handleNetworkAppError(error, dispatch)
        }))
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        taskAPI.updateTasks(taskId, todolistId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error => {
                handleNetworkAppError(error, dispatch)
            }))
    }

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof updateTaskAC>
type ThunkDispatch = Dispatch<ActionType | setAppStatusActionType | setAppErrorActionType>

