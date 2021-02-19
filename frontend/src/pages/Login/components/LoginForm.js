import React, {useState} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import {Button, TextField, Typography} from '@material-ui/core';
import {useGlobalContext} from '../../../context';

const LoginForm = () => {
    const {account} = useGlobalContext();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const determineNewUser = () => {
        if(account.currentUser == null){
            history.push('/new')
        } else{
            history.push('/dashboard')
        }
    }

    const handleSubmitEmailPwd = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
                await determineNewUser()
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage('The email or password is incorrect!');
            });
    };
    
    const handleSubmitGoogleAuth = () => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(async () => {
                await determineNewUser()
            })
            .catch((err) => {
            console.log(err);
            setErrorMessage('Something went wrong with OAuth!');
        });
    }
    
    return (
        <form className="login-form">
            <Typography className="" color="error">
                {errorMessage}
            </Typography>
            <TextField
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className=""
                variant="outlined"
                color="primary"
                error={errorMessage.length > 0}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className=""
                variant="outlined"
                color="primary"
                error={errorMessage.length > 0}
            />
            <Button
                variant="contained"
                color="primary"
                className=""
                onClick={() => handleSubmitEmailPwd()}
            >
                Sign in
            </Button>
    
            <Button
                variant="contained"
                color="primary"
                className=""
                onClick={() => handleSubmitGoogleAuth() }
            >
                Sign in with Google
            </Button>
        </form>
    );
};

export default LoginForm;