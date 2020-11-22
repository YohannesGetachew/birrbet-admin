import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    padding: "10px",
  },
  profileUploaderC: {
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    widht: "50px",
    height: "50px",
  },
  formItem: {
    padding: "10px",
  },
  submitBtnC: {
    justifyContent: "flex-end",
    padding: "10px",
  },
}));

export default style;
