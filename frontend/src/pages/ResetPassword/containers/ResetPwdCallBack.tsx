import React from 'react';
import { Box, Typography } from '@material-ui/core';
import ResetPasswordCallBackForm from '../components/ResetPwdCallBackForm';

const ResetPasswordCallBack = () => (
    <Box className="login">
        <Typography variant="h3" className="login__header">
            Confirm Reset Password
        </Typography>
        <ResetPasswordCallBackForm />
    </Box>
);

export default ResetPasswordCallBack;
