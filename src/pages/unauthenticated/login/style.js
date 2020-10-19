import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  formC: {
    backgroundColor: theme.palette.secondary.dark,
    background: `linear-gradient(180deg, ${theme.palette.secondary.main} 26%, ${theme.palette.secondary.dark} 100%)`,
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
