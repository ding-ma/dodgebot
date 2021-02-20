import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Typography} from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const NotFound = () => {
    const history = useHistory();
    
    return (
        <div className="">
            <SentimentVeryDissatisfiedIcon
                color="primary"
                className=""
            />
            <Typography color="primary" variant="h4" className="">
                404 - Page not found
            </Typography>
            <br/>
            <Typography className="">
                The page you requested does not exist or you <br/> do not have
                permissions to view this page.
            </Typography>
            <br/>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
            >
                Go back
            </Button>
        </div>
    );
};

export default NotFound;