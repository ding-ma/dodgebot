import React, {useState} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import {Button, TextField, Typography,} from '@material-ui/core';

//TODO: capture elo, rank and all that stuff

const RegisterForm = () => {
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = async () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailCheck = email.length && email.match(emailRegex);
        const passwordCheck = password.length >= 8;
        const confirmCheck = password === confirm && confirm.length;
        
        if (emailCheck && passwordCheck && confirmCheck) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                setEmailError(false);
                setPasswordError(false);
                setConfirmError(false);
                setErrorMessage('');
                history.push('/new');
            } catch (err) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        setEmailError(true);
                        setPasswordError(false);
                        setConfirmError(false);
                        setErrorMessage('This email is already in use!');
                        break;
                    default:
                        console.log(err.message);
                }
            }
        } else {
            setEmailError(!emailCheck);
            setPasswordError(!passwordCheck);
            setConfirmError(!confirmCheck);
            setErrorMessage('One or more fields have an error!');
        }
    };
    
    return (
        <form className="login-form">
            {errorMessage && (
                <Typography className="login-form__error" color="error">
                    {errorMessage}
                </Typography>
            )}
            <TextField
                required
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="login-form__input"
                variant="outlined"
                color="primary"
                error={emailError}
            />
            
            <TextField
                required
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="login-form__input"
                variant="outlined"
                color="primary"
                helperText="Password must be at least 8 characters long"
                error={passwordError}
            />
            <TextField
                label="Confirm password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.currentTarget.value)}
                className="login-form__input"
                variant="outlined"
                color="primary"
                error={confirmError}
            />
            <Button
                variant="contained"
                color="primary"
                className="login-form__button"
                onClick={() => handleSubmit()}
            >
                Sign up
            </Button>
        </form>
    );
};

export default RegisterForm;