import React, { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { store } from "react-notifications-component";
import TextField from "../../MaterialUIOverwrite/TextField";

const ResetPwdForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        store.addNotification({
          title: "Reset Link Sent",
          message: "Check your emails!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid Email");
      });
  };

  return (
    <form className="login-form">
      <Typography className="reset-form__error" color="error">
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

      <Button
        variant="contained"
        color="primary"
        className="login-form__button"
        onClick={() => handleSubmit()}
      >
        Reset
      </Button>
    </form>
  );
};

export default ResetPwdForm;
