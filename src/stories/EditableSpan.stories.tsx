import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskType} from "../Todolist";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange:{
            description: 'Changed value editable span'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value to editable span'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => {
    return <EditableSpan {...args}/>
};

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action('Value changed')
};
