import React from 'react';
import App from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
};

export const AppBaseExample = () => {
    return (<App demo={true}/>)
}
