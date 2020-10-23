import React from "react";
import { CircularProgress, IconButton } from "@material-ui/core";
import {
  Print,
  PrintDisabled,
  Edit,
  Delete,
  VisibilityRounded,
  LockOpenRounded,
  LockRounded,
} from "@material-ui/icons";
import iconButtonStyle from "./style";
import { Skeleton } from "@material-ui/lab";

const getItemsByType = (type, style, disabled, isAvailable, loading) => {
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

      return isAvailable ? (
        <LockRounded className={style.icon} />
      ) : (
        <LockOpenRounded className={style.icon} />
      );
    default:
      return <Print className={style.icon} />;
  }
};

const CustomIconButton = ({
  type,
  handleClick,
  disabled,
  isAvailable,
  loading,
}) => {
  const style = iconButtonStyle({ type, disabled });
  return (
    <IconButton
      onClick={handleClick}
      disabled={disabled || loading}
      className={style.root}
    >
      {getItemsByType(type, style, disabled, isAvailable, loading)}
    </IconButton>
  );
};

export { CustomIconButton };
