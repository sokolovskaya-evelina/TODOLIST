import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../App/store";
import {v1} from "uuid";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodolistsList/tasks_reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists_reducer";
import {TaskPriorities, TaskStatuses} from "../../API/task-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        error: null,
        status: "idle"
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)


export default ReduxStoreProviderDecorator;