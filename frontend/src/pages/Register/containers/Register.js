import React from "react";
import { Box, Typography } from "@material-ui/core";
import RegisterForm from "../components/RegisterForm";
import Link from "../../MaterialUIOverwrite/Link";
import endpoints from "../../../api/endpoints";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  return (
    <Box className="login">
      <Typography variant="h3" className="login__header">
        Register
      </Typography>
      <RegisterForm />
      <div className="login-footer">
        <Typography color="inherit" className="login-footer__text">
          Already have an account?{" "}
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

export default Register;
