import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Link from "../../MaterialUIOverwrite/Link";
import endpoints from "../../../api/endpoints";
import Logo from "../../../images/Logo.png";

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const isUserLogged = await firebase.auth().currentUser;
      if (isUserLogged) {
        history.push(endpoints.uri.predict);
      }
    })();
  }, [history]);

  return (
    <div style={{ display: "flex", width: "100%", height: "86vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "50%",
          borderRight: "1px solid #c49c3c",
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{ width: "80%", marginBottom: "2%" }}
        ></img>
        <Typography
          variant="h4"
          style={{
            marginBottom: "12%",
            color: "#DDE2CF",
            fontFamily: "Courier New",
          }}
        >
          /däj'bät/
        </Typography>
        <Typography
          variant="h5"
          style={{
            margin: "5%",
            color: "#b08e3a",
            fontFamily: "Courier New",
            fontWeight: "bold",
          }}
        >
          Trained on over 10 million matches, this tool will help you predict
          the winner of your next game of League of Legends!
        </Typography>
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "80%", textAlign: "center" }}>
          <Typography variant="h4" style={{ color: "#DDE2CF" }}>
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
              <Link onClick={() => history.push(endpoints.uri.reset)}>
                Reset
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
