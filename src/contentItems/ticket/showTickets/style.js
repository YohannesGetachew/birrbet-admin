import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  actionsC: {
    backgroundColor: theme.palette.primary.dark,
    textAlign: "right",
    padding: "8px",
  },
  printBtn: {
    backgroundColor: theme.palette.accentTwo.dark,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.accentTwo.main,
    },
  },
}));

export default style;
