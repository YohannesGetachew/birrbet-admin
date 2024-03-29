import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  profileCard: {
    padding: "10px",
    backgroundColor: theme.palette.secondary.dark,
    textAlign: "center",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
  },
  name: {
    fontSize: "30px",
    color: theme.palette.primary.dark,
    marginBottom: "10px",
  },
  username: {
    fontSize: "18px",
    color: theme.palette.secondary.light,
    marginBottom: "10px",
  },
  roleTag: {
    backgroundColor: `${theme.palette.success.dark}88`,
    color: theme.palette.success.light,
    fontWeight: "bold",
    padding: "4px",
  },
  currency: {
    fontSize: "12px",
    marginLeft: "4px",
  },
  accountBalance: {
    fontSize: "16px",
    marginBottom: "10px",
    color: theme.palette.secondary.light,
  },
}));

export default style;
