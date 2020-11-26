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
    marginBottom: "5px",
  },
  pending: {},
  win: {
    backgroundColor: `${theme.palette.success.light}44`,
    paddingLeft: "4px",
    borderRadius: "4px",
    "@media print": {
      backgroundColor: "transparent",
      borderRadius: 0,
      padding: 0,
    },
  },
  lose: {
    backgroundColor: `${theme.palette.error.dark}22`,
    paddingLeft: "4px",
    borderRadius: "4px",
    "@media print": {
      backgroundColor: "transparent",
      borderRadius: 0,
      padding: 0,
    },
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
