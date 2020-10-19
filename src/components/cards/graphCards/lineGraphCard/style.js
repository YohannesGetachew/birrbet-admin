import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    height: "100%",
    borderRadius: "4px",
  },
  padded: {
    padding: "20px",
  },
  title: {
    marginLeft: "10px",
    fontWeight: "normal",
    color: theme.palette.primary.main,
  },
}));

export default style;
