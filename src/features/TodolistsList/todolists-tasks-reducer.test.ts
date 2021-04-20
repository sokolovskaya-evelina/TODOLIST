import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists_reducer";
import {tasksReducer, TasksStateType} from "./tasks_reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        id: 'ldkmf',
        title: 'New Todolist',
        order: 0,
        addedDate: '',
        filter: "all",
        entityStatus: "idle"
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

