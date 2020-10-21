import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    textAlign: "center",
    height: "100%",
    borderRadius: "4px 4px 0 0",
  },
  copyrightText: {
    color: theme.palette.secondary.main,
    fontSize: "13px",
  },
}));

export default style;
