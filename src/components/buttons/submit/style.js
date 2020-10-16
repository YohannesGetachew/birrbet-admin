import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  btn: {
    backgroundColor: (props) =>
      props.dark ? theme.palette.accentTwo.dark : theme.palette.primary.light,
    "&:hover": {
      backgroundColor: (props) =>
        props.dark ? theme.palette.accentTwo.main : theme.palette.primary.dark,
    },
    "&:disabled": {
      color: (props) =>
        props.dark ? theme.palette.accentOne.dark : theme.palette.primary.dark,
    },
    color: (props) =>
      props.dark ? theme.palette.primary.dark : theme.palette.accentOne.dark,
    fontSize: theme.typography.button.fontSize,
  },
  progress: {
    marginRight: "10px",
  },
}));

export default style;
