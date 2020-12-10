const style = (theme) => ({
  root: {},
  ticketItem: {
    backgroundColor: theme.palette.primary.light,
    padding: "10px",
  },
  alignTextCenter: {
    textAlign: "center",
  },
  smallText: {
    fontSize: "13px",
  },
  padding: {
    padding: "10px 30px 10px",
  },
  lightText: {
    color: theme.palette.accentOne.dark,
    fontWeight: "600",
    fontSize: "14px",
  },
  boldFont: {
    fontSize: "14px",
    fontWeight: "500",
    margin: "0 8px 8px 0",
    color: theme.palette.accentOne.dark,
  },
  header: {
    fontSize: "30px",
    margin: "16px",
  },
  logo: {
    width: "100px",
    height: "100px",
  },
  bMargin: {
    marginBottom: "10px",
  },
  pending: {},
  bet: {
    paddingLeft: "4px",
    borderRadius: "4px",
    "@media print": {
      backgroundColor: "transparent !important",
      borderRadius: 0,
      padding: 0,
    },
  },
  statusText: {
    fontSize: "18px",
    fontWeight: "bold",
    "@media print": {
      display: "none",
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
    fontSize: "17px",
  },
  betDetails: {
    marginRight: "20px",
  },
  summary: {
    justifyContent: "flex-end",
  },
  terms: {
    margin: "20px 0",
  },
});

export default style;
