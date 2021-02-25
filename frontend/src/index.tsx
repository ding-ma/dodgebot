import React from 'react';
import ReactDOM from 'react-dom';
import {GlobalContextProvider} from './context';
import Router from './router';
import './styles/main.scss';

ReactDOM.render(
    <GlobalContextProvider>
        <Router />
    </GlobalContextProvider>,
    document.getElementById('root'),
);