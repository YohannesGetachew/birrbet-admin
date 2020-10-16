import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  header: {
    fontSize: theme.typography.h2.fontSize,
    color: theme.palette.primary.dark,
  },
  submitBtnC: {
    paddingTop: "20px",
  },
}));

export default style;
