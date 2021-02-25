import React, {useState} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import {Button, TextField, Typography} from '@material-ui/core';
import {useGlobalContext} from '../../../context';


const ResetPwdForm = () => {
    const { account } = useGlobalContext();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = () => {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                history.push('/login')
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage('Invalid Email');
            });
    };
    
    return (
        <form className="login-form">
            <Typography className="reset-form__error" color="error">
                {errorMessage}
            </Typography>
            <TextField
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="login-form__input"
                variant="outlined"
                color="primary"
                error={errorMessage.length > 0}
            />
            
            <Button
                variant="contained"
                color="primary"
                className="login-form__button"
                onClick={() => handleSubmit()}
            >
                Reset
            </Button>
        </form>
    );
};

export default ResetPwdForm;