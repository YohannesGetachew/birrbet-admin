import { makeStyles } from "@material-ui/core/styles";

const FULLY_EXTENDED_SIDEBAR_WIDTH = "180px";
const PARTIALLY_COLLAPSED_SIDEBAR_WIDTH = "80px";
const FULLY_COLLAPSED_SIDEBAR_WIDTH = "0";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: "mediumspringgreen",
    display: "grid",
    gridTemplateRows: "0 100vh",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      gridTemplateRows: "50px auto",
    },
  },
  topBarC: {},
  sideBarAndContentC: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
  },
  sideBarC: {
    backgroundColor: theme.palette.secondary.dark,
    borderTop: `0.001em solid ${theme.palette.primary.dark}55`,
    opacity: 1,
    flex: (props) =>
      props.collapsed
        ? `0 0 ${PARTIALLY_COLLAPSED_SIDEBAR_WIDTH}`
        : `0 0 ${FULLY_EXTENDED_SIDEBAR_WIDTH}`,
    transition: "all 0.6s",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      opacity: (props) => (props.collapsed ? 0 : 1),
      width: (props) =>
        props.collapsed
          ? FULLY_COLLAPSED_SIDEBAR_WIDTH
          : FULLY_EXTENDED_SIDEBAR_WIDTH,
      position: "absolute",
      zIndex: "101",
      top: "0",
      left: "0",
      bottom: "0",
      [theme.breakpoints.down("sm")]: {
        boxShadow: `1px 1px 8px ${theme.palette.accentOne.light}`,
      },
    },
  },
  backdrop: {
    display: "none",
    transition: "all 0.9",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      position: "absolute",
      zIndex: "98",
      top: "0",
      left: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      width: (props) => (props.collapsed ? "0" : "100%"),
    },
  },
  contentC: {
    backgroundColor: theme.palette.primary.main,
    position: "relative",
    flexGrow: "1",
    overflow: "auto",
  },
}));

export default style;
