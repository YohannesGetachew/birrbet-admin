import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    margin: "4px 8px 4px 8px",
    padding: "4px 0 4px 8px",
    backgroundColor: (props) =>
      props.match ? theme.palette.accentTwo.main : "transparent",
    borderRadius: "3px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "inherit",
    color: "inherit",
  },
  iconNnameC: {
    color: (props) =>
      props.match ? theme.palette.primary.light : theme.palette.secondary.dark,
    alignItems: "center",
    justifyContent: (props) => (props.collapsed ? "center" : "flex-start"),
  },
  iconC: {
    marginRight: "8px",
    marginTop: "2px",
    fontSize: "10px",
  },
  nameC: {
    fontWeight: "600",
    fontSize: "14px",
    display: (props) => (props.collapsed ? "none" : "inline-block"),
  },
}));

export default style;
