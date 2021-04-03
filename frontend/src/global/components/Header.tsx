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
  const history = useHistory();
  const classes = useStyles();

  //quick hack to render!
  useEffect(() => {
    function getAlerts() {
      if (firebase.auth().currentUser) {
        setUserlogin(true);
      } else {
        setUserlogin(false);
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
        <div
          className={classes.linkText}
          onClick={() => firebase.auth().signOut()}
        >
          <div
            onClick={() => history.push(endpoints.uri.home)}
            className={classes.linkText}
          >
            <ListItem button>
              <ListItemText style={{ color: "#FFFFFF" }} primary="Logout" />
            </ListItem>
          </div>
        </div>
      );
    } else {
      // No user is signed in.
      return (
        <div className={classes.linkText}>
          <ListItem onClick={() => history.push(endpoints.uri.home)}>
            <ListItemText style={{ color: "#FFFFFF" }} primary="Login" />
          </ListItem>
        </div>
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

            {userLogin && (
              <div className={classes.linkText}>
                <ListItem
                  button
                  onClick={() => history.push(endpoints.uri.history)}
                >
                  <ListItemText
                    style={{ color: "#FFFFFF" }}
                    primary="History"
                  />
                </ListItem>
              </div>
            )}

            {userLogin && (
              <div className={classes.linkText}>
                <ListItem
                  button
                  onClick={() => history.push(endpoints.uri.favorites)}
                >
                  <ListItemText
                    style={{ color: "#FFFFFF" }}
                    primary="Favorites"
                  />
                </ListItem>
              </div>
            )}

            {userLogin && (
              <div className={classes.linkText}>
                <ListItem
                  button
                  onClick={() => history.push(endpoints.uri.settings)}
                >
                  <ListItemText
                    style={{ color: "#FFFFFF" }}
                    primary="Account"
                  />
                </ListItem>
              </div>
            )}

            {renderLoginLogout()}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
