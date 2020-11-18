import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  modalC: {
    backgroundColor: theme.palette.primary.light,
    padding: "10px",
    fontSize: "30px",
    fontWeight: "600",
    color: theme.palette.accentOne.light,
  },
  buttonsC: {
    padding: "4px",
    textAlign: "right",
  },
}));

export default style;
