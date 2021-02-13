import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskType} from "../Todolist";


export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => <div>
    <Task todolistId={'todolist1'}
          changeTaskStatus={changeStatusCallback}
          changeTaskTitle={changeTitleCallback}
          removeTask={removeCallback}
          task={{id: '1', isDone: true, title: 'CSS'}}/>
    <Task todolistId={'todolist2'}
          changeTaskStatus={changeStatusCallback}
          changeTaskTitle={changeTitleCallback}
          removeTask={removeCallback}
          task={{id: '2', isDone: false, title: 'JS'}}/>
</div>;

export const TaskExample = Template.bind({});
TaskExample.args = {};
