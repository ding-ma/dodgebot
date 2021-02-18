import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import firebase from 'firebase';
import Layout from '../../global/containers/Layout'
import Stats from "../../pages/Stats/containers/Stats";
import Home from "../../pages/Home";
// import LoginForm from '../../pages/Login/components/LoginForm';

const Router = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyBXM-gu-99JxDtSMr02ZBBAUfDdWnI1vxk",
            authDomain: "dodge-bot.firebaseapp.com",
            databaseURL: "https://dodge-bot.firebaseio.com",
            projectId: "dodge-bot",
            storageBucket: "dodge-bot.appspot.com",
            messagingSenderId: "692707592061",
            appId: "1:692707592061:web:d72d5b9c419155cddfae14"
        });
    }

    return (
        <BrowserRouter>
            <Layout>
                <Switch>

                    <Route path="/stats" component={Stats}/>
                    <Route path="/" component={Home}/>
                    {/*<Route exact path="/login" component={LoginForm}/>*/}

                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;