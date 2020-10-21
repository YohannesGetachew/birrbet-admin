import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  firstRowFirstColumnItem: {
    justifyContent: "center",
    padding: "5px",
    "@media only screen and  (min-width: 450px) and (max-width: 600px)": {
      flexGrow: 0,
      maxWidth: "50%",
      flexBasis: "50%",
    },
  },
}));

export default style;
