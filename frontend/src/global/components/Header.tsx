import * as React from "react";
import {AppBar, Container, IconButton, List, ListItem, ListItemText, Toolbar} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "firebase";

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    },
    navBar: {
        background: '#c79b3b'
    },
    home: {
        fill: 'white'
    }
});


const Header = () => {
    
    const renderLoginLogout = () => {
        const user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
            return <a href='/' key='Logout' className={classes.linkText}>
                <ListItem button>
                    <ListItemText primary='Logout' onClick={() => firebase.auth().signOut()}/>
                </ListItem>
            </a>
        } else {
            // No user is signed in.
            return <a href='/' key='Login' className={classes.linkText}>
                <ListItem button>
                    <ListItemText primary='Login'/>
                </ListItem>
            </a>
        }
        
        
    }
    const classes = useStyles();
    
    return (
        <AppBar position="static" className={classes.navBar}>
            <Toolbar>
                <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <a href='/dashboard'>
                            <Home fontSize="large" className={classes.home}/>
                        </a>
                    </IconButton>
                    <List
                        component="nav"
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        
                        <a href='/stats' key='Stats' className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary='Stats'/>
                            </ListItem>
                        </a>
                        
                        {renderLoginLogout()}
                    
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
