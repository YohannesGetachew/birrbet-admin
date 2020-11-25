import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
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
    padding: "8px",
    boxShadow: theme.shadows[4],
    borderRight: `4px solid ${theme.palette.accentTwo.main}`,
  },
  allTimeTitle: {
    color: theme.palette.secondary.main,
    marginBottom: "8px",
  },
  allTimeNumber: {
    color: theme.palette.secondary.light,
    fontSize: "14px",
  },
}));

export default style;
