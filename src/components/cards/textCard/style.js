import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: (props) =>
      props.cardColor(theme).bgc || theme.palette.primary.dark,
    color: (props) =>
      props.cardColor(theme).color || theme.palette.secondary.dark,
    padding: "15px 60px 15px 15px",
    borderRadius: "4px",
    position: "relative",
  },
  title: {
    fontWeight: "normal",
    marginBottom: "15px",
    opacity: "0.9",
  },
  body: {
    marginBottom: "15px",
  },
  analytics: {
    color: (props) =>
      props.direction === "increase"
        ? theme.palette.success.main
        : theme.palette.error.main,
  },
  analyticsStartDate: {
    fontSize: "10px",
    marginTop: "4px",
    opacity: "0.7",
  },
  cardIcon: {
    position: "absolute",
    right: "0px",
    top: "-12px",
    // transform: "translateY(-50%)",
    fontSize: "25px",
    boxShadow: theme.shadows[8],
    borderRadius: "50%",
    backgroundColor: theme.palette.accentOne.main,
    padding: "4px",
  },
  icon: {
    fontSize: "14px",
  },
}));

export default style;
