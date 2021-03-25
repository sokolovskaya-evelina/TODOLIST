import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./API/task-api";
import {FilterValueType, TodolistDomainType} from "./state/todolists_reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "Rest API",
                status: TaskStatuses.New,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "GraphQL",
                status: TaskStatuses.New,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: todolistId2,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "Bred",
                status: TaskStatuses.New,
                todoListId: todolistId2,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    })

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }


    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, status: TaskStatuses.New,
            todoListId: todolistId,
            addedDate: '',
            deadline: '',
            description: '',
            startDate: '',
            order: 0,
            priority: TaskPriorities.Low}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.status = status
            setTasks({...tasksObj})
        }
    }

    function changeTitle(id: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === tl.id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }


    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }


    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistDomainType = {id: newTodolistId, title: title, filter: 'all', addedDate: '', order: 0}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasksObj,
            [newTodolistId]: []
        })
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Tasks</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasksObj[tl.id]

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
                                              id={tl.id}
                                              key={tl.id}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTodolistTitle={changeTodolistTitle}
                                              changeTaskTitle={changeTitle}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default App;
