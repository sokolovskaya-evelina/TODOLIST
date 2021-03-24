import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, FilterValueType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists_reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks_reducer";
import {TaskStatuses, TodoTaskPriorities} from "./API/task-api";


function AppWithReducers() {
    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }


    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC( {
            todoListId: todolistId,
            title: 'juce',
            status: TaskStatuses.New,
            priority: TodoTaskPriorities.Low,
            order: 0,
            startDate: '',
            description: '',
            deadline: '',
            addedDate: '',
            id: 'id exists'
        }))
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        dispatchToTodolists(changeFilterTodolistAC(todolistId, value))
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, status, todolistId))
    }

    function changeTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolists(changeTitleTodolistAC(id, newTitle))
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ])

    let removeTodolist = (todolistId: string) => {
        dispatchToTasks(removeTodolistAC(todolistId))
        dispatchToTodolists(removeTodolistAC(todolistId))
    }

    let [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: v1(), title: "Rest API", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: v1(), title: "GraphQL", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low
            }
        ],
        [todolistId2]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: todolistId2,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low
            },
            {
                id: v1(), title: "Bred", status: TaskStatuses.Completed,
                todoListId: todolistId2,
                addedDate: '',
                deadline: '',
                description: '',
                startDate: '',
                order: 0,
                priority: TodoTaskPriorities.Low
            }
        ]
    })

    function addTodolist(title: string) {
        dispatchToTasks(addTodolistAC({
            id: v1(),
            filter: "all",
            addedDate: '',
            order: 0,
            title: title
        }))
        dispatchToTodolists(addTodolistAC({
            id: v1(),
            filter: "all",
            addedDate: '',
            order: 0,
            title: title
        }))
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


export default AppWithReducers;
