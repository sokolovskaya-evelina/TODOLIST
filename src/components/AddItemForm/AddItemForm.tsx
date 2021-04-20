import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {
    console.log('AddItemForm')
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label="Title"
                       helperText={error}
                       disabled={disabled}
            />
            <IconButton color={"primary"} onClick={addTask} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})
