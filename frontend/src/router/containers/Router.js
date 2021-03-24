import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../../global/containers/Layout';
import Stats from "../../pages/Stats/containers/Stats";
import Login from "../../pages/Login/containers/Login"
import Register from "../../pages/Register/containers/Register"
import ResetPwd from "../../pages/ResetPassword";
import NotFound from '../../pages/NotFound';
import NewPlayer from "../../pages/NewPlayer";
import Dashboard from "../../pages/History";
import PrivateRoute from "../components/PrivateRoute";
import ResetPasswordCallBack from '../../pages/ResetPassword/containers/ResetPwdCallBack';
import firebase from "firebase";
import { AuthProvider } from "../../context/providers/AccountProvider";
import Header from "../../global/components/Header";
import Setting from "../../pages/Setting/containers/Setting";
import Predictions from "../../pages/Prediction/containers/Predictions";
import Favorites from "../../pages/Favorites/containers/Favorites";
import ReactNotification from 'react-notifications-component'
import { isMobile } from 'react-device-detect';


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

    if (isMobile) {
        return <div>
            <p style={{textAlign: "center", color: "#87742a", marginTop: "30vh", marginLeft: "5%", marginRight: "5%"}}>DodgeBot is not available on mobile yet. Please access it on your computer.</p>
        </div >
    }

    return (
        <AuthProvider>
            <ReactNotification />
            <Header />
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/stats" component={Stats} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/reset" component={ResetPwd} />
                        <Route exact path="/confirm" component={ResetPasswordCallBack} />
                        <PrivateRoute exact path="/new" component={NewPlayer} />
                        <PrivateRoute exact path="/history" component={Dashboard} />
                        <PrivateRoute exact path="/settings" component={Setting} />
                        <PrivateRoute exact path="/predict" component={Predictions} />
                        <PrivateRoute exact path="/favorites" component={Favorites} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default Router;