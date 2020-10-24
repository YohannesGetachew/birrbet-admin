import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    textAlign: "right",
  },
  addBtn: {
    marginBottom: "8px",
    padding: "5px 15px",
    backgroundColor: theme.palette.accentTwo.dark,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.accentTwo.main,
      color: theme.palette.primary.main,
    },
  },
}));

export default style;
