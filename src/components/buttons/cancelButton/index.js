import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import cancelButtonStyle from "./style";

const CancelButton = ({ redirectRoute, onClick, label }) => {
  const history = useHistory();
  const style = cancelButtonStyle();
  const handleDefaultClick = () => history.push(redirectRoute);
  return (
    <Button className={style.cancelBtn} onClick={onClick || handleDefaultClick}>
      {label}
    </Button>
  );
};

export default CancelButton;

CancelButton.propTypes = {
  redirectRoute: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

CancelButton.defaultProps = {
  label: "Cancel",
};
