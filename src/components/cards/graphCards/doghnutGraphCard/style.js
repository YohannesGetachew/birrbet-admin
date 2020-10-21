import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    padding: "20px",
    borderRadius: "4px",
  },
  title: {
    color: theme.palette.secondary.dark,
    opacity: 0.9,
    fontWeight: "normal",
    marginBottom: "10px",
  },
}));

export default style;
