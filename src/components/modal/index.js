import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Grid } from "@material-ui/core";
import ReactDOM from "react-dom";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";

import customModalStyle from "./style";

const CustomModal = forwardRef((props, ref) => {
  const { closeUsingBackdrop, contentWidth } = props;

  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    };
  });

  const open = () => {
    setDisplay(true);
  };
  const close = () => {
    setDisplay(false);
  };

  const style = customModalStyle();
  if (display) {
    return ReactDOM.createPortal(
      <Grid container className={style.modalContainer}>
        <Grid
          className={style.backdrop}
          onClick={closeUsingBackdrop ? close : null}
        ></Grid>
        <Grid
          item
          container
          xs={contentWidth.xs}
          md={contentWidth.md}
          className={style.contentC}
        >
          <Grid item xs={12} className={style.closeButtonC}>
            <Close onClick={close} className={style.closeIcon} />
          </Grid>
          <Grid item xs={12} className={style.childrenC}>
            {props.children}
          </Grid>
        </Grid>
      </Grid>,
      document.getElementById("modal-root")
    );
  }
  return null;
});

export default CustomModal;

CustomModal.propTypes = {
  closeUsingBackdrop: PropTypes.bool,
  contentWidth: PropTypes.shape({
    xs: PropTypes.number,
    md: PropTypes.number,
  }),
};

CustomModal.defaultProps = {
  closeUsingBackdrop: true,
  contentWidth: {
    xs: 11,
    md: 4,
  },
};
