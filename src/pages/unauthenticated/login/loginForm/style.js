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
    padding: "8px",
    borderRadius: "4px",
    // border: `3px solid ${theme.palette.accentTwo.dark}`,
    // marginRight: "2px",
    backgroundColor: `${theme.palette.primary.dark}dd`,
    // color: theme.palette.primary.light,
    boxShadow: theme.shadows[10],
  },
  submitBtnC: {
    paddingTop: "20px",
  },
  errorC: {
    margin: "10px 0",
  },
}));

export default style;
