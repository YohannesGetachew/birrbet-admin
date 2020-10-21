import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    padding: "0 50px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 20px",
    },
    position: "relative",
    minHeight: "100vh",
  },
  headerNbodyC: {
    paddingBottom: "3rem",
  },
  contentBodyC: {
    margin: "30px 0 40px 0",
  },
  footerC: {
    position: "absolute",
    bottom: 0,
    left: 50,
    right: 50,
    [theme.breakpoints.down("sm")]: {
      left: 20,
      right: 20,
    },
    height: "2.5rem",
  },
}));
export default style;
