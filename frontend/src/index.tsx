import React from 'react';
import ReactDOM from 'react-dom';
import {GlobalContextProvider} from './context';
import Router from './router';
import './styles/main.scss';
import Header from "./global/components/Header";

ReactDOM.render(
    <GlobalContextProvider>
        <Header/>
        <Router />
    </GlobalContextProvider>,
    document.getElementById('root'),
);