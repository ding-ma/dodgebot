import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import firebase from 'firebase';
import Layout from '../../global/containers/Layout';
import Stats from "../../pages/Stats/containers/Stats";
import Welcome from "../../pages/Welcome/containers/Welcome";
import Login from "../../pages/Login/containers/Login"
import Register from "../../pages/Register/containers/Register"
import ResetPwd from "../../pages/ResetPassword";
import NotFound from '../../pages/NotFound';


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

                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/stats" component={Stats}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/reset" component={ResetPwd}/>
                    <Route component={NotFound}/>

                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;