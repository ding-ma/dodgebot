import * as React from "react";
import {useEffect, useState} from "react";
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
    const [userLogin, setUserlogin] = useState(false);
    
    //quick hack to render!
    useEffect(() => {
        function getAlerts() {
            if (firebase.auth().currentUser) {
                setUserlogin(true)
            } else {
                setUserlogin(false)
            }
        }
        
        getAlerts()
        const interval = setInterval(() => getAlerts(), 500)
        return () => {
            clearInterval(interval);
        }
    }, [])
    
    const renderLoginLogout = () => {
        if (userLogin) {
            // User is signed in.
            return (
                <div className={classes.linkText} onClick={() => firebase.auth().signOut()}>
                    <a href="/" key='Logout' className={classes.linkText}>
                        <ListItem button>
                            <ListItemText style={{ color: '#FFFFFF' }} primary='Logout'/>
                        </ListItem>
                    </a>
                </div>
            )
        } else {
            // No user is signed in.
            return <a href='/' key='Login' className={classes.linkText}>
                <ListItem button>
                    <ListItemText style={{ color: '#FFFFFF' }} primary='Login'/>
                </ListItem>
            </a>
        }
        
        
    }
    const classes = useStyles();
    
    return (
        <AppBar position="fixed" style={{height: "6.5vh"}} className={classes.navBar}>
            <Toolbar>
                <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        {userLogin && <a href='/dashboard'>
                            <Home fontSize="large" className={classes.home}/>
                        </a>}
                    </IconButton>
                    <List
                        component="nav"
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        <a href='/stats' key='Stats' className={classes.linkText}>
                            <ListItem button>
                                <ListItemText style={{ color: '#FFFFFF' }} primary='How it works'/>
                            </ListItem>
                        </a>
                        
                        {userLogin &&
                        <a href='/predict' key='predict' className={classes.linkText}>
                            <ListItem button>
                                <ListItemText style={{ color: '#FFFFFF' }} primary='Predict'/>
                            </ListItem>
                        </a>
                        }
    
                        {userLogin &&
                        <a href='/favorites' key='favorites' className={classes.linkText}>
                            <ListItem button>
                                <ListItemText style={{ color: '#FFFFFF' }} primary='Favorites'/>
                            </ListItem>
                        </a>
                        }
                        
                        {userLogin &&
                        <a href='/settings' key='settings' className={classes.linkText}>
                            <ListItem button>
                                <ListItemText style={{ color: '#FFFFFF' }} primary='Account'/>
                            </ListItem>
                        </a>
                        }
                        
                        {renderLoginLogout()}
                    
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
