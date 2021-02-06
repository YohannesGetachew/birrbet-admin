import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  modalRoot: {
    backgroundColor: theme.palette.primary.light,
    textAlign: "center",
    padding: "10px",
  },
  copyBtn: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.primary.light,
  },
}));

export default style;
