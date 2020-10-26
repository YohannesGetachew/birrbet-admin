import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    padding: "10px",
  },
  formItem: {
    padding: "12px",
  },
  submitBtnC: {
    justifyContent: "flex-end",
    padding: "10px",
    border: "1px solid #0000000",
  },
}));

export default style;
