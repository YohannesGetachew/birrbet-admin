import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100%",
  },
  collapseIconC: {
    width: "180px",
    height: "100%",
    position: "relative",
  },
  collapseIcon: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default style;
