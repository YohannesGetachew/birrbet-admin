import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  confirmActionModal: {
    backgroundColor: theme.palette.primary.light,
    padding: "20px",
    color: theme.palette.accentOne.main,
  },
  messageC: {
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: "30px",
  },
}));

export default style;
