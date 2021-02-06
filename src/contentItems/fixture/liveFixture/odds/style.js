import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  market: {
    color: theme.palette.accentOne.light,
  },
  betC: {
    color: theme.palette.accentOne.light,
    justifyContent: "space-between",
  },
  bet: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "500",
    fontSize: "14px",
    flex: "1 1 0",
    padding: "8px",
    justifyContent: "space-between",
    margin: "4px 2px 4px 0",
  },
  wideBet: {
    flex: `1 1 ${"20%"}`,
  },
  increase: {
    backgroundColor: `${theme.palette.success.main}33`,
  },
  decrease: {
    backgroundColor: `${theme.palette.error.main}33`,
  },
}));
