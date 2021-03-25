import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../API/task-api";

export type TaskPropsType = {
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    removeTask: (taskID: string, todolistId: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler =() => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New , props.todolistId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.task.id, props.todolistId, props.changeTaskTitle])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox color="primary"
                      onChange={onChangeStatusHandler}
                      checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan value={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})