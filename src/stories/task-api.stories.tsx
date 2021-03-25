import React, {useState} from 'react'
import {taskAPI, TaskStatuses, TaskPriorities} from "../API/task-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = ()=>{
        taskAPI.getTasks(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder='todolistId' value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <button onClick={getTasks}>get tasks</button>
    </div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = ()=>{
        taskAPI.createTasks(todolistId, title)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder='todolistId' value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder='title' value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>delete task</button>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = ()=>{
        taskAPI.deleteTasks(taskId,todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder='todolistId' value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder='taskId' value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = ()=>{
        taskAPI.updateTasks(taskId,todolistId, {
            title: title,
            startDate: '',
            priority: TaskPriorities.Low,
            description: '',
            deadline: '',
            status: TaskStatuses.New,
        })
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder='todolistId' value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder='taskId' value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
        <input placeholder='title' value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
        <button onClick={updateTask}>update task</button>
    </div>
}
