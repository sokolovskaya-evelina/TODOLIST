import React from 'react';
import {Task, TaskPropsType} from "../Task";
import {TaskPriorities, TaskStatuses} from "../API/task-api";
import {Meta, Story} from "@storybook/react";
// @ts-ignore
import {action} from "@storybook/addon-actions";


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
          task={{id: '1', status: TaskStatuses.Completed, title: 'CSS',
              todoListId: 'todolistId2',
              addedDate: '',
              deadline: '',
              description: '',
              startDate: '',
              order: 0,
              priority: TaskPriorities.Low}}/>
    <Task todolistId={'todolist2'}
          changeTaskStatus={changeStatusCallback}
          changeTaskTitle={changeTitleCallback}
          removeTask={removeCallback}
          task={{id: '2', status: TaskStatuses.New,
              todoListId: 'todolistId2',
              addedDate: '',
              deadline: '',
              description: '',
              startDate: '',
              order: 0,
              priority: TaskPriorities.Low, title: 'JS'}}/>
</div>;

export const TaskExample = Template.bind({});
TaskExample.args = {};
