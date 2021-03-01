import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './styles/main.scss';
import Header from "./global/components/Header";
import {AuthProvider} from "./context/providers/AccountProvider"

ReactDOM.render(
    <AuthProvider>
        <Header/>
        <Router/>
    </AuthProvider>
    , document.getElementById('root'),
)
;