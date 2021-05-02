import {
    addTodolistsTC,
    changeFilterTodolistAC, changeTitleTodolistsTC,
    changeTodolistEntityStatusAC, fetchTodolistsTC,
    FilterValueType, removeTodolistsTC,
    TodolistDomainType,
    todolistsReducer
} from './todolists_reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../App/app-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistsTC.fulfilled({id: todolistId1}, 'requestId', 'todolistId1'))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todolist: TodolistDomainType = {
        id: 'hello',
        title: 'new todolist',
        order: 0,
        addedDate: '',
        filter: "all",
        entityStatus: "idle"
    }
    const endState = todolistsReducer(startState, addTodolistsTC.fulfilled({todolist: todolist}, 'requestId', 'new todolist'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    let payload = {id: todolistId2, title: newTodolistTitle};
    const action = changeTitleTodolistsTC.fulfilled(payload, '', payload)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = "completed";

    const action = changeFilterTodolistAC({id: todolistId2, filter: newFilter})
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be added', () => {
    const action = fetchTodolistsTC.fulfilled({todolists: startState}, 'requestId');

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "succeeded";

    const action = changeTodolistEntityStatusAC({id: todolistId2, status: newStatus})
    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});
