import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    padding: "10px",
  },
  formItem: {
    padding: "8px",
  },
  imageErr: {
    color: theme.palette.error.main,
    fontSize: "13px",
  },
  uploaderHeader: {
    color: theme.palette.secondary.main,
    margin: "16px 0 8px 0",
  },
  submitButtonC: {
    textAlign: "right",
    padding: "20px",
    width: "100%",
  },
}));

export default style;
