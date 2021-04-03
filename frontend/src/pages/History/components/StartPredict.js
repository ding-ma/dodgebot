import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import endpoints from "../../../api/endpoints";

export default function StartPredict() {
  const history = useHistory();

  return (
    <div>
      <Button
        style={{ width: "100%" }}
        variant="contained"
        color="primary"
        className="login-form__button"
        onClick={() => history.push(endpoints.uri.predict)}
      >
        Click here to start predicting your WINS!
      </Button>
    </div>
  );
}
