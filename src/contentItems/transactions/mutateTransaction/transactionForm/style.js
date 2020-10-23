import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    padding: "10px",
    borderRadius: "0 4px 4px 4px",
  },
  balanceC: {
    textAlign: "center",
  },
  currentBalanceText: {
    fontSize: "16px",
    fontWeight: "500",
    color: theme.palette.secondary.main,
    marginBottom: "8px",
  },
  viewBalanceC: {
    color: theme.palette.secondary.dark,
    fontWeight: "500",
  },
  amount: {
    fontSize: "40px",
  },
  currency: {
    fontSize: "15px",
  },
  chooseCustomer: {
    fontSize: "40px",
  },
  formItem: {
    padding: "12px",
  },
  submitBtnC: {
    justifyContent: "flex-end",
    padding: "12px",
  },
}));

export default style;
