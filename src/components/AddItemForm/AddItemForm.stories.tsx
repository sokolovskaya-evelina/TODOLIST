import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
}


export const AddItemFormExample = (props: any) =>{
    return (<AddItemForm
        addItem = {action('AddItemFormExample clicked')}
    />)
}
export const AddItemDisabledExample = (props: any) =>{
    return (<AddItemForm
        addItem = {action('AddItemFormExample clicked')}
        disabled = {true}
    />)
}
