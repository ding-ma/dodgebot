import LinkMui from "@material-ui/core/Link";
import React from "react";

const Link = ({ classes, ...props }) => {
  return <LinkMui style={{ color: "#c79b3b" }} {...props} />;
};

export default Link;
