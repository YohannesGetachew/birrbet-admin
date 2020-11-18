import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import submitBtnStyle from "./style";

const SubmitButton = ({
  isSubmitting,
  label,
  progressSize,
  dark,
  customAction,
  ...rest
}) => {
  const style = submitBtnStyle({ dark });
  return (
    <Button
      {...rest}
      type={customAction ? "button" : "submit"}
      className={style.btn}
      disabled={isSubmitting}
      onClick={customAction ? customAction : null}
    >
      {isSubmitting ? (
        <CircularProgress className={style.progress} size={progressSize} />
      ) : null}{" "}
      {label}
    </Button>
  );
};

SubmitButton.propTypes = {
  isSubmitting: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.string,
  progressSize: PropTypes.number,
  dark: PropTypes.bool,
};

SubmitButton.defaultProps = {
  variant: "contained",
  fullWidth: false,
  size: "small",
  progressSize: 17,
  dark: true,
};

export default SubmitButton;
