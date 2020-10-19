import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  header: {
    fontSize: theme.typography.h2.fontSize,
    color: theme.palette.primary.dark,
    marginBottom: "20px",
  },
  submitBtnC: {
    paddingTop: "20px",
  },
  errorC: {
    margin: "10px 0",
  },
}));

export default style;
