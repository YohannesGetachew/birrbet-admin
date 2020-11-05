import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    // height: "100%",
    width: "100%",
    borderRadius: "4px",
  },
  padded: {
    padding: "20px",
  },
  title: {
    marginLeft: "10px",
    fontWeight: "normal",
    color: theme.palette.primary.main,
    opacity: "0.9",
    fontSize: "20px",
  },
}));

export default style;
