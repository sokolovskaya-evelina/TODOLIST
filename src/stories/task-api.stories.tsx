import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolist-api";
import {taskAPI} from "../API/task-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='13bebb41-5db8-448b-a567-a8e73c1f096e'
    useEffect(() => {
        taskAPI.getTasks(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const todolistId='13bebb41-5db8-448b-a567-a8e73c1f096e'

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.createTasks(todolistId, 'first task')
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const todolistId='13bebb41-5db8-448b-a567-a8e73c1f096e'
    const taskId='1524b4d6-f5dc-4d8f-84d2-6b885c72057d'

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTasks(taskId,todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='13bebb41-5db8-448b-a567-a8e73c1f096e'
    const taskId='1524b4d6-f5dc-4d8f-84d2-6b885c72057d'

    useEffect(() => {
            taskAPI.updateTasks(taskId,todolistId,'HELLO!!!')
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
