import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../../global/containers/Layout";
import Stats from "../../pages/Stats/containers/Stats";
import Login from "../../pages/Login/containers/Login";
import Register from "../../pages/Register/containers/Register";
import ResetPwd from "../../pages/ResetPassword";
import NotFound from "../../pages/NotFound";
import NewPlayer from "../../pages/NewPlayer";
import Dashboard from "../../pages/History";
import PrivateRoute from "../components/PrivateRoute";
import ResetPasswordCallBack from "../../pages/ResetPassword/containers/ResetPwdCallBack";
import firebase from "firebase";
import { AuthProvider } from "../../context/providers/AccountProvider";
import Header from "../../global/components/Header";
import Setting from "../../pages/Setting/containers/Setting";
import Predictions from "../../pages/Prediction/containers/Predictions";
import Favorites from "../../pages/Favorites/containers/Favorites";
import ReactNotification from "react-notifications-component";
import { isMobile } from "react-device-detect";
import endpoints from "../../api/endpoints";

const Router = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: endpoints.firebase.apiKey,
      authDomain: endpoints.firebase.authDomain,
      databaseURL: endpoints.firebase.databaseURL,
      projectId: endpoints.firebase.projectId,
      storageBucket: endpoints.firebase.storageBucket,
      messagingSenderId: endpoints.firebase.messagingSenderId,
      appId: endpoints.firebase.appId,
    });
  }

  if (isMobile) {
    return (
      <div>
        <p
          style={{
            textAlign: "center",
            color: "#87742a",
            marginTop: "30vh",
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          DodgeBot is not available on mobile yet. Please access it on your
          computer.
        </p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ReactNotification />
      <BrowserRouter>
        <Header />
        <Layout>
          <Switch>
            <Route exact path={endpoints.uri.home} component={Login} />
            <Route exact path={endpoints.uri.stats} component={Stats} />
            <Route exact path={endpoints.uri.register} component={Register} />
            <Route exact path={endpoints.uri.reset} component={ResetPwd} />
            <Route
              exact
              path={endpoints.uri.confirm}
              component={ResetPasswordCallBack}
            />
            <PrivateRoute
              exact
              path={endpoints.uri.new}
              component={NewPlayer}
            />
            <PrivateRoute
              exact
              path={endpoints.uri.history}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path={endpoints.uri.settings}
              component={Setting}
            />
            <PrivateRoute
              exact
              path={endpoints.uri.predict}
              component={Predictions}
            />
            <PrivateRoute
              exact
              path={endpoints.uri.favorites}
              component={Favorites}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
