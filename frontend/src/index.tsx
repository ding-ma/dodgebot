import React from 'react';
import ReactDOM from 'react-dom';
import {GlobalContextProvider} from './context';
import Router from './router';

ReactDOM.render(
    <GlobalContextProvider>
        <Router />
    </GlobalContextProvider>,
    document.getElementById('root'),
);