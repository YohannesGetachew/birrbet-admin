import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  chooseReport: {
    fontSize: "25px",
    fontStyle: "italic",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    marginRight: "15px",
  },
  selectC: {
    // textAlign: "center",
    padding: "8px",
  },
  tabBody: {
    backgroundColor: `${theme.palette.primary.dark}`,
    padding: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  allTimeTicketIncome: {
    borderRadius: "4px",
    backgroundColor: theme.palette.primary.light,
    padding: "12px",
    boxShadow: theme.shadows[4],
  },
  allTimeUserWon: {
    borderRight: `4px solid ${theme.palette.accentTwo.main}`,
  },
  allTimeSystemWon: {
    marginTop: "10px",
    borderRight: `4px solid ${theme.palette.secondary.main}`,
  },
  allTimeTitle: {
    color: theme.palette.secondary.main,
    marginBottom: "8px",
  },
  allTimeNumber: {
    color: theme.palette.secondary.light,
    fontSize: "14px",
  },
  cashierTable: {
    marginBottom: "30px",
  },
}));

export default style;
