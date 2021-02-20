import React from 'react';
import {Box, Link, Typography} from '@material-ui/core';
import RegisterForm from '../components/RegisterForm';

const Register = () => (
    <Box boxShadow={2} className="register">
        <Typography variant="h3" className="">
            Register
        </Typography>
        <RegisterForm/>
        <div className="footer">
            <Typography color="primary" className="">
                Already have an account?{' '}
                <Link color="primary" href="/login">
                    Login
                </Link>
            </Typography>
        </div>
    </Box>
);

export default Register;