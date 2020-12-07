import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  addBtn: {
    marginBottom: "8px",
    padding: "5px 30px",
    backgroundColor: theme.palette.accentTwo.dark,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.accentTwo.main,
      color: theme.palette.primary.main,
    },
  },
}));

export default style;
