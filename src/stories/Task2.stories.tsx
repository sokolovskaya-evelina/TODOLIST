import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../features/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../API/task-api";


export default {
    title: 'Todolist/Task2',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => {
    return <Task {...args}/>
};

const baseArg = {
    removeTask: removeCallback,
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArg,
    task: {
        id: '1', status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Low, title: 'CSS'
    },
    todolistId: 'todolist1'
};
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {
        id: '2', status: TaskStatuses.New,
        todoListId: 'todolistId2',
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Low, title: 'JS'
    },
    todolistId: 'todolist2'
};
