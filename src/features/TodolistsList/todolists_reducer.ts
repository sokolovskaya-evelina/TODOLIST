import {todolistAPI, TodolistType} from "../../API/todolist-api";
import {RequestStatusType, setAppStatus} from "../../App/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//thunks
export const fetchTodolistsTC = createAsyncThunk('todolist/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodolist()
        dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        handleNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const removeTodolistsTC = createAsyncThunk('todolist/removeTodolists', async (todolistId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        dispatch(setAppStatus({status: 'succeeded'}))
        handleServerAppError(res.data, dispatch)
        return {id: todolistId}
    } catch (error) {
        handleNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const addTodolistsTC = createAsyncThunk('todolist/addTodolists', async (title: string, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(title)
        dispatch(setAppStatus({status: 'succeeded'}))
        handleServerAppError(res.data, dispatch)
        return {todolist: res.data.data.item}
    } catch (error) {
        handleNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const changeTitleTodolistsTC = createAsyncThunk('todolist/changeTitleTodolists', async (param: { id: string, title: string }, {dispatch,rejectWithValue}) => {
    try {
        const res = await todolistAPI.updateTodolist(param.id, param.title)
        handleServerAppError(res.data, dispatch)
        return {id: param.id, title: param.title}
    } catch (error) {
        handleNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {changeFilterTodolistAC: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        }, changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },},
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        })
        builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload?.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
        })
        builder.addCase(addTodolistsTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTitleTodolistsTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload?.id)
                state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {
    changeFilterTodolistAC,
    changeTodolistEntityStatusAC,
} = slice.actions

//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType, entityStatus: RequestStatusType }




