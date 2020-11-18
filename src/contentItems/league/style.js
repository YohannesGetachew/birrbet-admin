import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  modalContent: {
    backgroundColor: theme.palette.primary.light,
    padding: "10px",
    color: theme.palette.accentOne.main,
  },
  buttonsC: {
    textAlign: "right",
    padding: "4px",
  },
}));

export default style;
