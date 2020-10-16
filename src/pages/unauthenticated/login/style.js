import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  formC: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  pictureC: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  picture: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));

export default style;
