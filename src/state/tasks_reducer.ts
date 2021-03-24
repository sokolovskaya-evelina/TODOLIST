import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists_reducer";
import {v1} from "uuid";
import {taskAPI, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskType} from "../API/task-api";
import {Dispatch} from "redux";
import {todolistAPI} from "../API/todolist-api";
import {act} from "react-dom/test-utils";
import {AppRootStateType} from "./store";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    status: TaskStatuses,
    todolistId: string
}

type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionType =
    RemoveTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            let task = action.task
            let tasks = stateCopy[action.task.todoListId]
            let newTasks = [task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, status: action.status}
                    : t)
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todolist.id] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    }
}

export const addTaskAC = (task: TaskType): addTaskActionType => {
    return {
        type: "ADD-TASK",
        task
    }
}

export const changeTaskStatusAC = (taskId: string,
                                   status: TaskStatuses,
                                   todolistId: string): changeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        status,
        todolistId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const removeTasksTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTasks(taskId, todolistId)
            .then((res) => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}

export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTasks(todolistId, title)
            .then((res) => {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
            })
    }
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            taskAPI.updateTasks(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status,
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}

export const changeTasksTitleTC = (taskId: string, title: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            taskAPI.updateTasks(taskId, todolistId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
            })
                .then((res) => {
                    const action = changeTaskTitleAC(taskId, title, todolistId)
                    dispatch(action)
                })
        }
    }
}