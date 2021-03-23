import React, {useEffect} from 'react';
import {Box, Typography} from '@material-ui/core';
import LoginForm from '../components/LoginForm';
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import Link from "../../MaterialUIOverwrite/Link"
import {isMobile} from 'react-device-detect';

const Login = () => {
    const history = useHistory();

    useEffect(() => {
        (async function () {
            const isUserLogged = await firebase.auth().currentUser;
            if (isUserLogged) {
                history.push("/predict")
            }
        })();
    }, [history]);

    if (isMobile) {
        return <div>DodgeBot is not available on mobile yet. Please access it on your computer</div>
    }

    return (
        <Box className="login">
            <Typography variant="h3" className="login__header">
                Login
            </Typography>
            <LoginForm/>
            <div className="login-footer">
                <Typography color="inherit" className="login-footer__text">
                    No account?{' '}
                    <Link href="/register">
                        Sign up
                    </Link>
                </Typography>
            </div>
            <div className="login-footer">
                <Typography color="inherit" className="login-footer__text">
                    Forgot Password?{' '}
                    <Link href="/reset">
                        Reset
                    </Link>
                </Typography>
            </div>
        </Box>
    )
};

export default Login;