import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import {useGlobalContext} from "../../../context";
import NewPlayerForm from "../components/NewPlayerForm";

const NewPlayer = () => {
    const {account} = useGlobalContext();
    const history = useHistory();
    
    return (
        <Box>
            <Typography variant="h3" className="">
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