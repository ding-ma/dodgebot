import React from "react";
import SettingForm from "../components/SettingForm";
import { Box, Typography } from "@material-ui/core";

const Setting = () => {
  return (
    <Box className="login">
      <Typography variant="h3" className="login__header">
        Change your settings
      </Typography>

      <SettingForm />
    </Box>
  );
};

export default Setting;
