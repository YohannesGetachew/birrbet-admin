import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) =>
      props.stakeCard
        ? theme.palette.secondary.main
        : theme.palette.primary.dark,
    color: (props) =>
      props.stakeCard
        ? theme.palette.primary.light
        : theme.palette.secondary.main,
    padding: "8px",
    borderRadius: "8px",
    position: "relative",
  },
  title: {},
  count: {
    fontSize: "70px",
    color: (props) =>
      props.stakeCard
        ? theme.palette.primary.light
        : theme.palette.secondary.main,
  },
  ticketIcon: {
    fontSize: "100px",
    transform: "rotate(-45deg)",
    color: theme.palette.accentTwo.light,
    opacity: 0.2,
    position: "absolute",
    top: 10,
    right: 10,
  },
  currency: {
    fontSize: "16px",
  },
}));

export default style;
