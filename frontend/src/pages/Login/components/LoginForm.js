import React, { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import "../styles/login.scss";
import TextField from "../../MaterialUIOverwrite/TextField";
import endpoints from "../../../api/endpoints";

const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitEmailPwd = async () => {
    firebase
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
    firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(async () => {
        const data = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get();
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
      <Button
        variant="contained"
        color="primary"
        className="login-form__button"
        onClick={() => handleSubmitEmailPwd()}
      >
        Sign in
      </Button>

      <Button
        variant="contained"
        color="primary"
        className="login-form__button"
        onClick={() => handleSubmitGoogleAuth()}
      >
        Sign in with Google
      </Button>

      <Button
        variant="contained"
        color="primary"
        className="login-form__button"
        onClick={() => handleSubmitAnonymousUser()}
      >
        Try the application
      </Button>
    </form>
  );
};

export default LoginForm;
