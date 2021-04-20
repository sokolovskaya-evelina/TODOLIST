import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
}


export const AddItemFormExample = (props: any) => {
    return (<AddItemForm
        addItem={action('AddItemFormExample clicked')}
    />)
}
export const AddItemDisabledExample = (props: any) => {
    return (<AddItemForm
        addItem={action('AddItemFormExample clicked')}
        disabled={true}
    />)
}
