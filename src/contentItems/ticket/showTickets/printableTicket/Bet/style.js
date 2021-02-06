import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  expired: {
    fontWeight: "Bold",
    textAlign: "right",
    color: theme.palette.error.dark,
    "@media print": {
      display: "none",
    },
  },
  lightText: {
    color: theme.palette.accentOne.dark,
    fontWeight: "600",
    fontSize: "8px",
  },
  bet: {
    paddingLeft: "4px",
    borderRadius: "4px",
    "@media print": {
      backgroundColor: "transparent !important",
      borderRadius: 0,
      padding: 0,
    },
  },
  winner: {
    backgroundColor: `${theme.palette.success.light}44`,
  },
  loser: {
    backgroundColor: `${theme.palette.error.dark}22`,
  },
  refund: {
    backgroundColor: `${theme.palette.warning.dark}22`,
  },
  cancelled: {
    backgroundColor: `${theme.palette.info.dark}22`,
  },
  halfWon: {
    background: `linear-gradient(90deg, ${theme.palette.success.light}44 26%, ${theme.palette.error.dark}22 100%)`,
  },
  halfLost: {
    background: `linear-gradient(90deg, ${theme.palette.error.dark}22 26%, ${theme.palette.success.light}44 100%)`,
  },
  betName: {
    fontWeight: "600",
    color: theme.palette.accentOne.dark,
    fontSize: "10px",
  },
  fixtureDate: {
    fontWeight: "600",
    color: theme.palette.accentOne.dark,
    fontSize: "9px",
  },
  betDetails: {
    marginRight: "20px",
  },
}));

export default style;
