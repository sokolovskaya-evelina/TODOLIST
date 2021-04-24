import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists_reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../API/task-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../App/store";
import {setAppStatus} from "../../App/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}
export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const task = state[action.payload.todolistId]
            const index = task.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                task.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const task = state[action.payload.todolistId]
            const index = task.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                task[index] = {...task[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer
//actions
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions
//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    taskAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({tasks, todolistId}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTasks(taskId, todolistId)
        .then((res) => {
            const action = removeTaskAC({taskId, todolistId})
            dispatch(action)
            handleServerAppError(res.data, dispatch)
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    taskAPI.createTasks(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const action = addTaskAC({task: res.data.data.item})
                dispatch(action)
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error => {
            handleNetworkAppError(error, dispatch)
        }))
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                    const action = updateTaskAC({taskId, model: domainModel, todolistId})
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

