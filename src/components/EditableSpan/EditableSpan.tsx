import React, {ChangeEvent, useState} from "react"
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    return editMode
        ? <TextField variant={"outlined"}
                     value={title}
                     onChange={onChangeTitleHandler}
                     onBlur={activateViewMode}
                     autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
