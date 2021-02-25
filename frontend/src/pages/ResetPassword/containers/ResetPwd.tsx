import React from 'react';
import {Box, Link, Typography} from '@material-ui/core';
import ResetPwdForm from '../components/ResetPwdForm';
import "../../Login/styles/login.scss"

const ResetPwd = () => (
    <Box className="login">
        <Typography variant="h3" className="reset__header">
            Reset Password
        </Typography>
        <ResetPwdForm />
        <div className="login-footer">
            <Typography color="inherit" className="login-footer__text">
                Remember Password?{' '}
                <Link color="primary" href="/login">
                    Login
                </Link>
            </Typography>
        </div>
    </Box>
);

export default ResetPwd;