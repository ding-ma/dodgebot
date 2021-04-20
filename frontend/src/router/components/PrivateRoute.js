import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import firebase from "firebase";
import endpoints from "../../api/endpoints";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, setState] = useState("loading");

  useEffect(() => {
    (async function () {
      try {
        const isUserLogged = await firebase.auth().currentUser;
        setState(isUserLogged ? "loggedin" : "redirect");
      } catch {
        setState("redirect");
      }
    })();
  }, []);

  if (state === "loading") {
    return <div />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (state === "redirect") {
          return <Redirect to={endpoints.uri.home} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
