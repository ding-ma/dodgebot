import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from '../../global/containers/Layout';
import Stats from "../../pages/Stats/containers/Stats";
import Welcome from "../../pages/Welcome/containers/Welcome";
import Login from "../../pages/Login/containers/Login"
import Register from "../../pages/Register/containers/Register"
import ResetPwd from "../../pages/ResetPassword";
import NotFound from '../../pages/NotFound';
import NewPlayer from "../../pages/NewPlayer";
import Dashboard from "../../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ResetPasswordCallBack from '../../pages/ResetPassword/containers/ResetPwdCallBack';

const Router = () => {

    return (
        <BrowserRouter>
            <Layout>
                <Switch>

                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/stats" component={Stats}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/reset" component={ResetPwd}/>
                    <Route exact path="/confirm" component={ResetPasswordCallBack} />
                    <PrivateRoute exact path="/new" component={NewPlayer}/>
                    <PrivateRoute exact path='/dashboard' component={Dashboard}/>

                    <Route component={NotFound}/>

                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;