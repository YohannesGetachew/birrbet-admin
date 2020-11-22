import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {},
  input: {
    display: "none",
  },
  avatar: {
    margin: "10px",
    width: "90px",
    height: "90px",
    boxShadow: theme.shadows[10],
  },
}));

export default style;
