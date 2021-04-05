import React, { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import "../styles/login.scss";
import TextField from "../../MaterialUIOverwrite/TextField";
import endpoints from "../../../api/endpoints";
import GoogleLogo from "../../../images/Google Logo.svg";

const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitEmailPwd = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        history.push(endpoints.uri.predict);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("The email or password is incorrect!");
      });
  };

  const handleSubmitGoogleAuth = async () => {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async () => {
        const data = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get();
        console.log(data);
        if (data.exists) {
          history.push(endpoints.uri.predict);
        } else {
          history.push(endpoints.uri.new);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Something went wrong with OAuth!");
      });
  };

  const handleSubmitAnonymousUser = async () => {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    await firebase.auth().signInAnonymously();
    history.push(endpoints.uri.predict);
  };

  return (
    <form className="login-form">
      <Typography className="login-form__error" color="error">
        {errorMessage}
      </Typography>
      <TextField
        required
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        className="login-form__input"
        variant="outlined"
        color="primary"
        error={errorMessage.length > 0}
      />
      <TextField
        required
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        className="login-form__input"
        variant="outlined"
        color="primary"
        error={errorMessage.length > 0}
      />

      <div className="wrapper">
        <div className="col">
          <Button
            variant="contained"
            color="primary"
            className="login-form__button"
            style={{ width: "15%" }}
            onClick={() => handleSubmitEmailPwd()}
          >
            Sign in
          </Button>
        </div>
        <div className="col">
          <Button
            variant="contained"
            color="primary"
            className="login-form__button"
            style={{ width: "15%" }}
            onClick={() => handleSubmitGoogleAuth()}
          >
            Sign in with
            <img
              src={GoogleLogo}
              alt="Sign in with Google"
              style={{ width: "13%", marginLeft: "5%" }}
            />
          </Button>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="login-form__button"
        onClick={() => handleSubmitAnonymousUser()}
      >
        Guest user
      </Button>
    </form>
  );
};

export default LoginForm;
