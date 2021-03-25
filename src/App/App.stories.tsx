import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import ReduxStoreProviderDecorator from "../stories/decorators/ReduxStoreProviderDecorator";
import App from "./App";


export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => {
    return <App/>
};

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

