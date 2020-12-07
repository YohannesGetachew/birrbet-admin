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
    boxShadow: theme.shadows[5],
  },
  confirmActionModal: {
    backgroundColor: theme.palette.primary.light,
    padding: "20px",
    color: theme.palette.accentOne.main,
  },
  amountField: {
    marginBottom: "20px",
  },
  messageC: {
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: "30px",
  },
  amount: {
    color: theme.palette.accentTwo.dark,
    fontWeight: "bold",
  },
  actionType: {
    backgroundColor: `${theme.palette.warning.light}AA`,
    color: theme.palette.secondary.dark,
    margin: "4px",
    padding: "2px 4px 4px 4px",
    fontWeight: "bold",
    borderRadius: "2px",
    boxShadow: theme.shadows[4],
  },
}));

export default style;
