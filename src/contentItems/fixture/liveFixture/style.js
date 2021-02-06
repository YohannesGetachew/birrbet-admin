import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    border: (props) =>
      props.updated ? `2px solid ${theme.palette.success.light}` : "none",
    marginBottom: "16px",
    color: `${theme.palette.accentOne.main}EE`,
    padding: "4px",
    borderRadius: "4px",
    boxShadow: theme.shadows[8],
  },
  fixtureName: {
    fontStyle: "italic",
  },
}));
