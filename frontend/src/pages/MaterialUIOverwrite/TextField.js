import { withStyles } from "@material-ui/core/styles";
import TextFieldMui from "@material-ui/core/TextField";
import React from "react";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },

  label: {
    color: "#c79b3b",
    "&$focusedLabel": {
      color: "#c79b3b",
    },
    "&$erroredLabel": {
      color: "red",
    },
    "&.Mui-focused": {
      color: "#c79b3b",
    },
  },

  cssOutlinedInput: {
    color: "white",
    "&$cssFocused $notchedOutline": {
      borderColor: "#c79b3b !important",
    },
  },

  cssFocused: {
    borderWidth: "1px",
    borderColor: "#c79b3b !important",
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#c79b3b !important",
  },
  disabledInput: {
    color: "#c4bb97",
  },
  helper: {
    color: "white",
  },
  icon: {
    color: "#c79b3b",
  },
});

const TextField = withStyles(styles)(function TextField({ classes, ...props }) {
  return (
    <TextFieldMui
      autoComplete="no"
      InputLabelProps={{
        classes: {
          root: classes.label,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
          disabled: classes.disabledInput,
        },
      }}
      SelectProps={{
        classes: {
          icon: classes.icon,
        },
      }}
      FormHelperTextProps={{ classes: { root: classes.helper } }}
      {...props}
    />
  );
});

export default withStyles(styles)(TextField);
