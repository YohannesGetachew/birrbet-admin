import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "4px 0 4px 8px",
    padding: "4px 0 4px 8px",
    backgroundColor: (props) =>
      props.match ? theme.palette.primary.main : "transparent",
    borderRadius: "3px 0 0 3px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "3px",
      margin: "4px 8px 4px 8px",
      padding: "4px 8px 4px 8px",
    },
    cursor: "pointer",
  },
  navCurve1: {
    position: "absolute",
    top: -17,
    right: -1,
    width: "18px",
    height: "18px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    // backgroundColor: theme.palette.primary.dark,
  },
  navCurve2: {
    position: "absolute",
    bottom: -17,
    right: -1,
    width: "18px",
    height: "18px",
    // backgroundColor: theme.palette.secondary.main,
    transform: "rotate(-90deg)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  link: {
    textDecoration: "inherit",
    color: "inherit",
  },
  iconNnameC: {
    color: (props) =>
      props.match ? theme.palette.secondary.dark : theme.palette.primary.light,
    alignItems: "center",
    justifyContent: (props) => (props.collapsed ? "center" : "flex-start"),
  },
  iconC: {
    marginRight: "8px",
    marginTop: "2px",
    fontSize: "10px",
  },
  nameC: {
    fontWeight: "600",
    fontSize: "14px",
    display: (props) => (props.collapsed ? "none" : "inline-block"),
  },
}));

export default style;
