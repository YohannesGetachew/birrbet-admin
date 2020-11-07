import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  tabBody: {
    backgroundColor: `${theme.palette.primary.dark}`,
    padding: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
}));

export default style;
