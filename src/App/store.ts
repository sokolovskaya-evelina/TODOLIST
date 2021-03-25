import {tasksReducer} from '../features/TodolistsList/tasks_reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists_reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
