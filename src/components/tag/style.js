import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles({
  root: {
    backgroundColor: (props) => `${props.backgroundColor}1b`,
    color: (props) => props.textColor,
    padding: "6px",
    fontWeight: "600",
    fontSize: "12px",
  },
});

export default style;
