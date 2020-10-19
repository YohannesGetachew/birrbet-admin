import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  // header: {
  //   fontSize: theme.typography.h2.fontSize,
  //   color: theme.palette.primary.dark,
  //   marginBottom: "20px",
  // },
  header: {
    color: theme.palette.primary.main,
  },
  logo: {
    padding: "0 8px 2px 8px",
    borderRadius: "4px",
    border: `3px solid ${theme.palette.accentTwo.dark}`,
    marginRight: "2px",
    backgroundColor: theme.palette.accentOne.dark,
    color: theme.palette.primary.light,
  },
  submitBtnC: {
    paddingTop: "20px",
  },
  errorC: {
    margin: "10px 0",
  },
}));

export default style;
