import React from 'react';
import {Box, Link, Typography} from '@material-ui/core';
import ResetPwdForm from '../components/ResetPwdForm';

const ResetPwd = () => (
    <Box boxShadow={2} className="">
        <Typography variant="h3" className="">
            Reset Password
        </Typography>
        <ResetPwdForm />
        <div className="">
            <Typography color="primary" className="">
                Remember Password?{' '}
                <Link color="primary" href="/login">
                    login
                </Link>
            </Typography>
        </div>
    </Box>
);

export default ResetPwd;