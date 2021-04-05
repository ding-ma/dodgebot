import React from "react";
import { Box, Typography } from "@material-ui/core";
import ResetPwdForm from "../components/ResetPwdForm";
import "../../Login/styles/login.scss";
import Link from "../../MaterialUIOverwrite/Link";
import endpoints from "../../../api/endpoints";
import { useHistory } from "react-router-dom";

const ResetPwd = () => {
  const history = useHistory();

  return (
    <Box style={{ display: "flex", flexDirection: "column", width: "35%", height: "86vh", alignItems: "center" }}>
      <Typography variant="h4" className="reset__header">
        Reset Password
      </Typography>
      <ResetPwdForm />
      <div className="login-footer">
        <Typography color="inherit" className="login-footer__text">
          Remember Password?{" "}
          <Link
            color="primary"
            onClick={() => history.push(endpoints.uri.home)}
          >
            Login
          </Link>
        </Typography>
      </div>
    </Box>
  );
};

export default ResetPwd;
