import React, { useEffect } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import endpoints from "../../../api/endpoints";
import { Box, Typography } from "@material-ui/core";
import NewPlayerForm from "../components/NewPlayerForm";

const NewPlayer = () => {
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const isUserLogged = await firebase.auth().currentUser;
      if (isUserLogged) {
        history.push(endpoints.uri.predict);
      }
    })();
  }, [history]);

  return (
    <Box className="login">
      <Typography variant="h3" className="login__header">
        Welcome to DogeBot Summoner!
      </Typography>
      <Typography className="">
        Please fill out the following form so we can predict your games with the
        highest accuracy
      </Typography>
      <NewPlayerForm />
    </Box>
  );
};

export default NewPlayer;
