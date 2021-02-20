import React from 'react';
import {Box, Link, Typography} from '@material-ui/core';
import LoginForm from '../components/LoginForm';

const Login = () => (
    <Box boxShadow={2} className="login">
        <Typography variant="h3" className="">
            Login
        </Typography>
        <LoginForm/>
        <div className="">
            <Typography color="primary" className="">
                No account?{' '}
                <Link color="primary" href="/register">
                    Sign up
                </Link>
            </Typography>
        </div>
        <div className="">
            <Typography color="primary" className="">
                Forgot Password?{' '}
                <Link color="primary" href="/reset">
                    Reset
                </Link>
            </Typography>
        </div>
    </Box>
);

export default Login;