import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    width: "100px",
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.dark,
    padding: "15px 60px 15px 15px",
    borderRadius: "4px",
  },
  title: {
    fontWeight: "normal",
    marginBottom: "15px",
  },
  body: {
    marginBottom: "15px",
  },
  analytics: {
    color: (props) => (props.direction === "increase" ? "green" : "red"),
  },
  analyticsStartDate: {
    fontSize: "10px",
    marginTop: "4px",
    opacity: "0.7",
  },
  icon: {
    fontSize: "14px",
  },
}));

export default style;
