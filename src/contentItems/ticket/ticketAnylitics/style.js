import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.dark,
    padding: "15px 8px 15px 8px",
    borderRadius: "8px",
    boxShadow: theme.shadows[10],
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "23px",
  },
  ticketsC: {
    marginTop: "30px",
  },
  amountC: {
    marginTop: "30px",
  },
  number: {
    fontSize: "20px",
    fontWeight: "bold",
    color: theme.palette.secondary.light,
  },
  numberDesc: {
    fontSize: "14px",
    color: theme.palette.secondary.light,
  },
}));

export default style;
