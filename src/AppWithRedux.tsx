import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, addTodolistsTC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, changeTitleTodolistsTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistsTC,
    TodolistDomainType
} from "./state/todolists_reducer";
import {
    addTasksTC,
    changeTaskStatusAC,
    changeTasksTitleTC,
    changeTaskTitleAC,
    removeTasksTC
} from "./state/tasks_reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./API/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTasksTC(id, todolistId)
        dispatch(thunk)
    }, [])


    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTasksTC(todolistId, title)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback(function (value: FilterValueType, todolistId: string) {
        dispatch(changeFilterTodolistAC(todolistId, value))
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(changeTaskStatusAC(id, status, todolistId))
    }, [])

    const changeTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTasksTitleTC(id, newTitle, todolistId))
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, newTitle: string) {
        const thunk = changeTitleTodolistsTC(id, newTitle)
        dispatch(thunk)
    }, [])

    const removeTodolist = useCallback(function (todolistId: string) {
        const thunk = removeTodolistsTC(todolistId)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistsTC(title)
        dispatch(thunk)
    }, [dispatch])


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
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

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


export default AppWithRedux;