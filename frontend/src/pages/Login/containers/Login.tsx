import React, {useEffect} from 'react';
import {Box, Link, Typography} from '@material-ui/core';
import LoginForm from '../components/LoginForm';
import firebase from "firebase";
import {useHistory} from "react-router-dom";

const Login = () => {
    const history = useHistory();
    
    useEffect(() => {
        (async function() {
                const isUserLogged = await firebase.auth().currentUser;
                if (isUserLogged){
                    history.push("/dashboard")
                }
        })();
    }, [history]);
    
    
    return (
        <Box className="login">
            <Typography variant="h3" className="login__header">
                Login
            </Typography>
            <LoginForm/>
            <div className="login-footer">
                <Typography color="inherit" className="login-footer__text">
                    No account?{' '}
                    <Link color="primary" href="/register">
                        Sign up
                    </Link>
                </Typography>
            </div>
            <div className="login-footer">
                <Typography color="inherit" className="login-footer__text">
                    Forgot Password?{' '}
                    <Link color="primary" href="/reset">
                        Reset
                    </Link>
                </Typography>
            </div>
        </Box>
    )
};

export default Login;