import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const NotFound = () => {
    const history = useHistory();
    
    return (
        <div className="not-found">
            <SentimentVeryDissatisfiedIcon
                color="primary"
                className="not-found__icon"
            />
            <Typography color="primary" variant="h4" className="not-found__header">
                404 - Page not found
            </Typography>
            <br />
            <Typography className="not-found__text">
                The page you requested does not exist or you <br /> do not have
                permissions to view this page.
            </Typography>
            <br />
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