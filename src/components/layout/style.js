import { makeStyles } from "@material-ui/core/styles";

const FULLY_EXTENDED_SIDEBAR_WIDTH = "150px";
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
  topBar: {
    backgroundColor: "grey",
  },
  sideBarAndContentC: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
  },
  sideBar: {
    backgroundColor: "#f4f5f7",
    flex: (props) =>
      props.collapsed
        ? `0 0 ${PARTIALLY_COLLAPSED_SIDEBAR_WIDTH}`
        : `0 0 ${FULLY_EXTENDED_SIDEBAR_WIDTH}`,
    transition: "all 0.8s",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      width: (props) =>
        props.collapsed
          ? FULLY_COLLAPSED_SIDEBAR_WIDTH
          : FULLY_EXTENDED_SIDEBAR_WIDTH,
      position: "absolute",
      zIndex: "99",
      top: "0",
      left: "0",
      bottom: "0",
      boxShadow: "2px 2px 8px #000000",
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
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      width: (props) => (props.collapsed ? "0" : "100%"),
    },
  },
  content: {
    backgroundColor: "#ffffff",
    position: "relative",
    flexGrow: "1",
    overflow: "auto",
  },
}));

export default style;
