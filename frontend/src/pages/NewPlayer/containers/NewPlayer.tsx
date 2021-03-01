import React from 'react';
import {Box, Typography} from '@material-ui/core';
import NewPlayerForm from "../components/NewPlayerForm";

const NewPlayer = () => {
    return (
        <Box className="login">
            <Typography variant="h3" className="login__header">
                Welcome to DogeBot Summoner!
            </Typography>
            <Typography className="">
                Please fill out the following form so we can predict your games with the highest accuracy
            </Typography>
            <NewPlayerForm/>
        </Box>
    )
}

export default NewPlayer;