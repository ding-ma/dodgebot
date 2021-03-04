import React, {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Button, TextField, Typography} from '@material-ui/core';
import firebase from 'firebase';
import {store} from 'react-notifications-component';

const ResetPasswordCallBack = () => {
    const history = useHistory();
    
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { search } = useLocation();
    const mode = new URLSearchParams(search).get('mode');
    const code = new URLSearchParams(search).get('oobCode');
    const [resetCode, setResetCode] = useState(code);
    
    const handleSubmit = () => {
        console.log(mode, pwd, code);
        
        if (resetCode === null || resetCode.length === 0) {
            setErrorMessage('Please check your email for reset link!');
            return;
        }
        if (pwd !== confirmPwd || pwd.length < 8) {
            setErrorMessage("Password doesn't match or length is smaller than 8");
            return;
        }
        firebase
            .auth()
            .confirmPasswordReset(resetCode, pwd)
            .then(() => {
                store.addNotification({
                    title: "Successfully changed!",
                    message: "Login with your new password",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000
                    }
                });
                history.push('/');
            })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/weak-password':
                        setErrorMessage('Password is too weak!');
                        break;
                    default:
                        setErrorMessage('Something went wrong! Please reset again');
                }
            });
    };
    
    return (
        <form className="login-form">
            <Typography className="login-form__error" color="error">
                {errorMessage}
            </Typography>
            <TextField
                label="Reset Code"
                value={resetCode}
                onChange={(e) => setResetCode(e.currentTarget.value)}
                className="login-form__input"
                variant="outlined"
                color="primary"
                error={errorMessage.length > 0}
            />
            <TextField
                label="Password"
                value={pwd}
                type="password"
                onChange={(e) => setPwd(e.currentTarget.value)}
                className="login-form__input"
                variant="outlined"
                color="primary"
                error={errorMessage.length > 0}
            />
            <TextField
                label="Confirm Password"
                value={confirmPwd}
                type="password"
                onChange={(e) => setConfirmPwd(e.currentTarget.value)}
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
                Reset!
            </Button>
        </form>
    );
};

export default ResetPasswordCallBack;
