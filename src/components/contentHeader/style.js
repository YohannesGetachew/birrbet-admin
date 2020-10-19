import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    padding: "10px 0",
  },
  title: {
    color: theme.palette.secondary.dark,
    opacity: "0.9",
    fontSize: "30px",
    fontWeight: "500",
  },
}));

export default style;
