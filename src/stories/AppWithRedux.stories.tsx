import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import ReduxStoreProviderDecorator from "./decorators/ReduxStoreProviderDecorator";
import AppWithRedux from "../AppWithRedux";


export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => {
    return <AppWithRedux/>
};

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

