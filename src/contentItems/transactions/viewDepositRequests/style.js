import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  evidenceModalRoot: {
    backgroundColor: theme.palette.primary.light,
    padding: "10px",
  },
  evidenceType: {
    marginBottom: "10px",
    fontStyle: "italic",
    color: theme.palette.accentOne.main,
  },
  transactionId: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.accentOne.dark,
    padding: "10px",
    borderRadius: "4px",
  },
  copyBtn: {
    marginTop: "10px",
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.primary.light,
  },
  evidenceImage: {
    width: "100%",
    height: "100%",
    boxShadow: theme.shadows[10],
  },
}));

export default style;
