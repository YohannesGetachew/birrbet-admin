import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    justifyContent: "space-between",
    flexDirection: (props) => (props.collapsed ? "column" : "row"),
    marginTop: "4px",
  },
  logoC: {
    marginLeft: (props) => (props.collapsed ? "24px" : "16px"),
  },
  logo: {
    fontSize: "20px",
  },
  onlyLogo: {
    padding: "0 8px 2px 8px",
    borderRadius: "4px",
    border: `2px solid ${theme.palette.accentTwo.main}`,
    marginRight: (props) => (props.collapsed ? 0 : "10px"),
    fontSize: "25px",
    backgroundColor: theme.palette.accentOne.dark,
    color: theme.palette.primary.light,
  },
  buttonC: {},
  button: {
    marginBottom: "-14px",
    color: theme.palette.secondary.main,
    marginLeft: (props) => (props.collapsed ? "24px" : 0),
  },
  logoName: {
    display: (props) => (props.collapsed ? "none" : "inline-block"),
  },
}));

export default style;
