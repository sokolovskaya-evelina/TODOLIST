import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {
    addTodolistsTC,
    changeFilterTodolistAC,
    changeTitleTodolistsTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistsTC,
    TodolistDomainType
} from "./todolists_reducer";
import {addTasksTC, removeTasksTC, TasksStateType, updateTaskTC} from "./tasks_reducer";
import {TaskStatuses} from "../../API/task-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList: React.FC = (props) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
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

    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
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
        <>
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
                                          changeTaskStatus={changeTaskStatus}
                                          changeTodolistTitle={changeTodolistTitle}
                                          changeTaskTitle={changeTaskTitle}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}