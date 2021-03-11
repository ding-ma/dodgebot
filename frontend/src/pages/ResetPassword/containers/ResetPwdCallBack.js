import React from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import ResetPasswordCallBackForm from '../components/ResetPwdCallBackForm';
import {useHistory, useLocation} from "react-router-dom";

const ResetPasswordCallBack = () => {
    const {search} = useLocation();
    const history = useHistory();

    const mode = new URLSearchParams(search).get('mode');
    const code = new URLSearchParams(search).get('oobCode');



    if (mode === "verifyEmail") {
        return (
            <Box className="login">
                <Typography variant="h3" className="login__header">
                    Thanks for confirming email!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className="login-form__button"
                    onClick={()=> history.push("/")}
                >
                   Return home
                </Button>
            </Box>
        )

    } else {
        return <Box className="login">
            <Typography variant="h3" className="login__header">
                Confirm Reset Password
            </Typography>
            <ResetPasswordCallBackForm code={code}/>
        </Box>
    }

};

export default ResetPasswordCallBack;
