import React, {useState} from 'react';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import {Button, TextField, Typography} from '@material-ui/core';
import "../styles/login.scss"


const LoginForm = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitEmailPwd = async () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
                history.push('/dashboard')
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage('The email or password is incorrect!');
            });
    };

    const handleSubmitGoogleAuth = async () => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(async () => {
                const data = await firebase.firestore()
                    .collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .get()
                if (data.exists){
                    history.push('/dashboard')
                } else {
                    history.push('/new')
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage('Something went wrong with OAuth!');
            });
    }

    return (
        <form className="login-form">
            <Typography className="login-form__error" color="error">
                {errorMessage}
            </Typography>
            <TextField
                required
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="login-form__input"
                variant="outlined"
                color="primary"
                error={errorMessage.length > 0}
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
                error={errorMessage.length > 0}
            />
            <Button
                variant="contained"
                color="primary"
                className="login-form__button"
                onClick={() => handleSubmitEmailPwd()}
            >
                Sign in
            </Button>

            <Button
                variant="contained"
                color="primary"
                className="login-form__button"
                onClick={() => handleSubmitGoogleAuth()}
            >
                Sign in with Google
            </Button>
        </form>
    );
};

export default LoginForm;
