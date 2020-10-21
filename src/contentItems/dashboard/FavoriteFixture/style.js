import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    padding: "10px",
    margin: "5px",
    borderRadius: "4px",
    "& .MuiTableCell-root": {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  table: {
    minWidth: 650,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.main,
    border: 0,
    padding: "3px",
  },
  tableTitle: {
    color: theme.palette.secondary.dark,
    fontWeight: "normal",
    opacity: "0.9",
    marginBottom: "3px",
  },
  tableBody: {
    color: theme.palette.secondary.main,
  },
}));

export default style;
