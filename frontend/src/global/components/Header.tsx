import * as React from "react";
import { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import "../styles/layout.scss";
import endpoints from "../../api/endpoints";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  navBar: {
    background: "#c79b3b",
  },
  home: {
    fill: "white",
  },
});

const Header = () => {
  const [userLogin, setUserlogin] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    function getAlerts() {
      if (firebase.auth().currentUser) {
        setUserlogin(true);
      } else {
        setUserlogin(false);
      }
      if (firebase.auth().currentUser?.isAnonymous) {
        setIsAnonymous(true);
      } else {
        setIsAnonymous(false);
      }
    }

    getAlerts();
    const interval = setInterval(() => getAlerts(), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderLoginLogout = () => {
    if (userLogin) {
      // User is signed in.
      return (
        <div className={classes.linkText}>
          <ListItem
            button
            onClick={() => {
              firebase.auth().signOut();
              history.push(endpoints.uri.home);
            }}
          >
            <ListItemText style={{ color: "#FFFFFF" }} primary="Logout" />
          </ListItem>
        </div>
      );
    } else {
      // No user is signed in.
      return (
        <div className={classes.linkText}>
          <ListItem button onClick={() => history.push(endpoints.uri.home)}>
            <ListItemText style={{ color: "#FFFFFF" }} primary="Login" />
          </ListItem>
        </div>
      );
    }
  };

  const sendRegisterNotification = () => {
    store.addNotification({
      title: "Register to access that feature",
      message: " ",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
  };
  const renderLoggedInButtons = () => {
    if (userLogin && !isAnonymous) {
      return (
        <>
          <a href={endpoints.uri.history}>
            <div className={classes.linkText}>
              <ListItem button>
                <ListItemText style={{ color: "#FFFFFF" }} primary="History" />
              </ListItem>
            </div>
          </a>
          <div className={classes.linkText}>
            <ListItem
              button
              onClick={() => history.push(endpoints.uri.favorites)}
            >
              <ListItemText style={{ color: "#FFFFFF" }} primary="Favorites" />
            </ListItem>
          </div>
          <div className={classes.linkText}>
            <ListItem
              button
              onClick={() => history.push(endpoints.uri.settings)}
            >
              <ListItemText style={{ color: "#FFFFFF" }} primary="Account" />
            </ListItem>
          </div>
        </>
      );
    }
    if (userLogin) {
      return (
        <>
          <div className={classes.linkText}>
            <ListItem button onClick={() => sendRegisterNotification()}>
              <ListItemText style={{ color: "black" }} primary="History" />
            </ListItem>
          </div>
          <div className={classes.linkText}>
            <ListItem button onClick={() => sendRegisterNotification()}>
              <ListItemText style={{ color: "black" }} primary="Favorites" />
            </ListItem>
          </div>
          <div className={classes.linkText}>
            <ListItem button onClick={() => sendRegisterNotification()}>
              <ListItemText style={{ color: "black" }} primary="Account" />
            </ListItem>
          </div>
        </>
      );
    }
  };

  return (
    <AppBar
      position="sticky"
      style={{ height: "55px" }}
      className={classes.navBar}
    >
      <Toolbar variant="dense">
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => history.push(endpoints.uri.predict)}
          >
            {userLogin && <Home fontSize="large" className={classes.home} />}
          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            <div className={classes.linkText}>
              <ListItem
                button
                onClick={() => history.push(endpoints.uri.stats)}
              >
                <ListItemText style={{ color: "#FFFFFF" }} primary="Stats" />
              </ListItem>
            </div>
            {renderLoggedInButtons()}
            {renderLoginLogout()}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
