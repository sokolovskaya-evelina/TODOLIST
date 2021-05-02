import {addTodolistsTC, FilterValueType, TodolistDomainType, todolistsReducer} from "./todolists_reducer";
import {tasksReducer, TasksStateType} from "./tasks_reducer";
import {RequestStatusType} from "../../App/app-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
let payload={
    id: '1111',
    title: 'New Todolist',
    order: 0,
    addedDate: '',
    filter: "all" as FilterValueType,
    entityStatus: "idle" as RequestStatusType
}
    const action = addTodolistsTC.fulfilled({todolist:payload},'', payload.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});

