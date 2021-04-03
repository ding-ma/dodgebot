import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import endpoints from "../../../api/endpoints";

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
        className="login-form__button"
        onClick={() => history.push(endpoints.uri.home)}
      >
        Go to home
      </Button>
    </div>
  );
};

export default NotFound;
