import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    marginBottom: (props) => (props.collapsed ? "30px" : "20px"),
  },
  category: {
    marginLeft: "16px",
    color: theme.palette.secondary.main,
    opacity: "0.9",
    fontSize: "12px",
    display: (props) => (props.collapsed ? "none" : "block"),
  },
}));

export default style;
