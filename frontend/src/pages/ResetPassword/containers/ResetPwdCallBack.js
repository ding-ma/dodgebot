import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import ResetPasswordCallBackForm from "../components/ResetPwdCallBackForm";
import { useLocation } from "react-router-dom";
import firebase from "firebase";
import NotFound from "../../NotFound";

const ResetPasswordCallBack = () => {
  const { search } = useLocation();

  const mode = new URLSearchParams(search).get("mode");
  const code = new URLSearchParams(search).get("oobCode");

  if (mode === "verifyEmail") {
    firebase.auth().applyActionCode(code);
    console.log(firebase.auth().currentUser);
    return (
      <Box className="login">
        <Typography variant="h3" className="login__header">
          Thanks for confirming email!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="login-form__button"
          onClick={() => window.close()}
        >
          Close page
        </Button>
      </Box>
    );
  } else if (mode === "resetPassword") {
    return (
      <Box className="login">
        <Typography variant="h3" className="login__header">
          Confirm Reset Password
        </Typography>
        <ResetPasswordCallBackForm code={code} />
      </Box>
    );
  } else {
    return <NotFound />;
  }
};

export default ResetPasswordCallBack;
