import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    padding: "20px",
    borderRadius: "4px",
  },
  title: {
    color: theme.palette.primary.main,
    opacity: 0.9,
    fontWeight: "normal",
    marginBottom: "10px",
  },
}));

export default style;
