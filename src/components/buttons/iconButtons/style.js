import { makeStyles } from "@material-ui/core/styles";

const getStyleByType = (type, theme) => {
  switch (type) {
    case "edit":
      return {
        iconColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.warning.dark,
      };
    case "delete":
      return {
        iconColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.error.main,
      };
    case "print":
      return {
        iconColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.secondary.main,
      };
    case "view":
      return {
        iconColor: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.light,
      };
    case "duplicate":
      return {
        iconColor: theme.palette.secondary.dark,
        backgroundColor: theme.palette.primary.main,
      };
    default:
      return {
        iconColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.secondary.main,
      };
  }
};

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) =>
      getStyleByType(props.type, theme).backgroundColor,
    margin: "4px",
    width: "34px",
    height: "34px",
    boxShadow: theme.shadows["3"],
    cursor: "pointer",
    "&:hover": {
      backgroundColor: (props) =>
        getStyleByType(props.type, theme).backgroundColor,
      boxShadow: theme.shadows["8"],
    },
    "&:disabled": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  icon: {
    color: (props) =>
      props.disabled
        ? theme.palette.accentOne.light
        : getStyleByType(props.type, theme).iconColor,
    fontSize: "18px",
  },
}));

export default style;
