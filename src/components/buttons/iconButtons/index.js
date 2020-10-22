import React from "react";
import { IconButton } from "@material-ui/core";
import {
  Print,
  PrintDisabled,
  Edit,
  Delete,
  VisibilityRounded,
} from "@material-ui/icons";
import iconButtonStyle from "./style";

const getItemsByType = (type, style, disabled) => {
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
    default:
      return <Print className={style.icon} />;
  }
};

const CustomIconButton = ({ type, handleClick, disabled }) => {
  const style = iconButtonStyle({ type, disabled });
  return (
    <IconButton
      onClick={handleClick}
      disabled={disabled}
      className={style.root}
    >
      {getItemsByType(type, style, disabled)}
    </IconButton>
  );
};

export { CustomIconButton };
