import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.accentOne.main,
  },
  progress: {
    color: theme.palette.primary.light,
    position: "absolute",
    marginLeft: "auto",
    right: "50%",
    marginTop: "auto",
    bottom: "50%",
  },
}));

export default style;
