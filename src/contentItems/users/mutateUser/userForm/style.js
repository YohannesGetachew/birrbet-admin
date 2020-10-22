import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "4px",
    padding: "10px",
  },
  formItemC: {
    padding: "8px 15px",
  },
  createButtonC: {
    justifyContent: "flex-end",
    padding: "10px",
  },
  cancelBtn: {
    color: theme.palette.secondary.light,
  },
}));

export default style;
