import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import cancelButtonStyle from "./style";

const CancelButton = ({ redirectRoute }) => {
  const history = useHistory();
  const style = cancelButtonStyle();
  return (
    <Button
      className={style.cancelBtn}
      onClick={() => history.push(redirectRoute)}
    >
      CANCEL
    </Button>
  );
};

export default CancelButton;

CancelButton.propTypes = {
  redirectRoute: PropTypes.string,
};