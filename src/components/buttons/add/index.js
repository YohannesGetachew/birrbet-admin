import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import addBtnStyle from "./style";

const AddButton = ({ redirectRoute, label, dontRender }) => {
  const history = useHistory();
  const defaultClickHandler = () => history.push(redirectRoute);
  const style = addBtnStyle();
  if (dontRender) {
    return null;
  }
  return (
    <Button
      onClick={defaultClickHandler}
      variant="contained"
      size="small"
      className={style.addBtn}
    >
      {label}
    </Button>
  );
};

export default AddButton;

AddButton.propTypes = {
  redirectRoute: PropTypes.string,
  label: PropTypes.string,
};
