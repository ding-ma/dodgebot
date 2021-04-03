import React, { useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Link from "../../MaterialUIOverwrite/Link";
import endpoints from "../../../api/endpoints";

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const isUserLogged = await firebase.auth().currentUser;
      if (isUserLogged) {
        history.push("/predict");
      }
    })();
  }, [history]);

  return (
    <Box className="login">
      <Typography variant="h3" className="login__header">
        Login
      </Typography>
      <LoginForm />
      <div className="login-footer">
        <Typography color="inherit" className="login-footer__text">
          No account?{" "}
          <Link onClick={() => history.push(endpoints.uri.register)}>
            Sign up
          </Link>
        </Typography>
      </div>
      <div className="login-footer">
        <Typography color="inherit" className="login-footer__text">
          Forgot Password?{" "}
          <Link onClick={() => history.push(endpoints.uri.reset)}>Reset</Link>
        </Typography>
      </div>
    </Box>
  );
};

export default Login;
