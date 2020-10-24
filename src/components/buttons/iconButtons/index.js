import React from "react";
import { CircularProgress, IconButton } from "@material-ui/core";
import {
  Print,
  PrintDisabled,
  Edit,
  Delete,
  VisibilityRounded,
  NoEncryptionRounded,
  LockRounded,
} from "@material-ui/icons";
import iconButtonStyle from "./style";

const getItemsByType = (type, style, disabled, locked, loading) => {
  switch (type) {
    case "print":
      return disabled ? (
        <PrintDisabled className={style.icon} />
      ) : (
        <Print className={style.icon} />
      );
    case "delete":
      return <Delete className={style.icon} />;
    case "edit":
      return <Edit className={style.icon} />;
    case "view":
      return <VisibilityRounded className={style.icon} />;
    case "lock":
      if (loading) {
        return <CircularProgress variant="indeterminate" size={14} />;
      }

      return locked ? (
        <NoEncryptionRounded className={style.icon} />
      ) : (
        <LockRounded className={style.icon} />
      );
    default:
      return <Print className={style.icon} />;
  }
};

const CustomIconButton = ({ type, handleClick, disabled, locked, loading }) => {
  const style = iconButtonStyle({ type, disabled });
  return (
    <IconButton
      onClick={handleClick}
      disabled={disabled || loading}
      className={style.root}
    >
      {getItemsByType(type, style, disabled, locked, loading)}
    </IconButton>
  );
};

export { CustomIconButton };
