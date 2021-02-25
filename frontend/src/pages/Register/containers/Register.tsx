import React from 'react';
import {Box, Link, Typography} from '@material-ui/core';
import RegisterForm from '../components/RegisterForm';

const Register = () => (
    <Box className="login">
        <Typography variant="h3" className="login__header">
            Register
        </Typography>
        <RegisterForm/>
        <div className="login-footer">
            <Typography color="inherit" className="login-footer__text">
                Already have an account?{' '}
                <Link color="primary" href="/login">
                    Login
                </Link>
            </Typography>
        </div>
    </Box>
);

export default Register;