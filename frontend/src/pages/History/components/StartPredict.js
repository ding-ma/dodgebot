import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        minWidth: 800,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export default function StartPredict() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
                    <Button 
                    style={{width:"100%"}}
                        variant="contained"
                        color="primary"
                        className="login-form__button"
                        onClick={() => history.push("/")}
                    >
                        Click here to start predict your WINS!
                    </Button>

        </div>
    );
}
