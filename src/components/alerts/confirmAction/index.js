import React from "react";
import customActionStyle from "./style";
import { CancelButton, SubmitButton } from "../../buttons";
import PropTypes from "prop-types";
import { AlertError } from "../../errors";

const ConfirmActionAlert = ({
  message,
  error,
  submitLabel,
  submitLoading,
  onSubmitClick,
  onCancleClick,
}) => {
  const style = customActionStyle();
  return (
    <div className={style.root}>
      {error && (
        <div>
          <AlertError />
        </div>
      )}
      <div className={style.messageC}> {message} </div>
      <div className={style.buttonsC}>
        <CancelButton onClick={onCancleClick} />
        <SubmitButton
          label={submitLabel}
          isSubmitting={submitLoading}
          customAction={onSubmitClick}
        />
      </div>
    </div>
  );
};

export default ConfirmActionAlert;

ConfirmActionAlert.propTypes = {
  message: PropTypes.object,
  submitLabel: PropTypes.string,
  isSubmitBtnLoading: PropTypes.bool,
  onSubmitClick: PropTypes.func,
  onCancelClick: PropTypes.func,
};

ConfirmActionAlert.defaultProps = {
  submitBtnLabel: "YES",
};
