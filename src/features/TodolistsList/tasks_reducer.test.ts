import {addTasksTC, fetchTasksTC, removeTasksTC, tasksReducer, TasksStateType, updateTaskTC,} from './tasks_reducer';
import {addTodolistsTC, fetchTodolistsTC, FilterValueType, removeTodolistsTC} from './todolists_reducer';
import {TaskPriorities, TaskStatuses} from "../../API/task-api";
import {RequestStatusType} from "../../App/app-reducer";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTasksTC.fulfilled({taskId: "2", todolistId: "todolistId2"}, 'requestId', {
        taskId: "2",
        todolistId: "todolistId2"
    });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
});

test('correct task should be added to correct array', () => {
    const action = addTasksTC.fulfilled({
        task: {
            status: TaskStatuses.New,
            todoListId: 'todolistId2',
            addedDate: '',
            order: 0,
            title: 'juice',
            id: 'id exists',
            deadline: '',
            description: '',
            startDate: '',
            priority: TaskPriorities.Low,
        }
    }, 'requestId', {title: 'juice', todolistId: 'todolistId2'});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    let updateModel = {
        taskId: "2",
        domainModel: {status: TaskStatuses.New},
        todolistId: "todolistId2"
    }
    const action = updateTaskTC.fulfilled(updateModel, '', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
    let updateModel = {
        taskId: "2",
        domainModel: {title: 'coffee'},
        todolistId: "todolistId2"
    }
    const action = updateTaskTC.fulfilled(updateModel, '', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('coffee');
    expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new property with new array should be added when new todolist is added', () => {
    let payload = {
        todolist: {
            addedDate: '',
            order: 0,
            title: 'new todolist',
            id: '111',
            filter: 'active' as FilterValueType,
            entityStatus: 'idle' as RequestStatusType
        }
    };
    const action = addTodolistsTC.fulfilled(payload, '', payload.todolist.title);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistsTC.fulfilled({id: "todolistId2"}, 'requestId', 'todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
    let payload = {
        todolists: [
            {id: "1", title: "title 1", order: 0, addedDate: "", filter: "all" as FilterValueType, entityStatus: "loading" as RequestStatusType},
            {id: "2", title: "title 2", order: 0, addedDate: "", filter: "all" as FilterValueType, entityStatus: "loading" as RequestStatusType}
        ]
    }
    const action = fetchTodolistsTC.fulfilled(payload, 'requestId')

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolist', () => {
    const action = fetchTasksTC.fulfilled({
        tasks: startState["todolistId1"],
        todolistId: "todolistId1"
    }, 'requestId', 'todolistId1');

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})




