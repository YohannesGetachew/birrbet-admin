const style = (theme) => ({
  root: {},
  ticketItem: {
    backgroundColor: theme.palette.primary.main,
    padding: "10px",
  },
  alignTextCenter: {
    textAlign: "center",
  },
  smallText: {
    fontSize: "13px",
  },
  lrPadding: {
    padding: "10px 30px 0px",
  },
  lightText: {
    color: theme.palette.accentOne.main,
    opacity: 0.9,
  },
  boldFont: {
    fontSize: "14px",
    fontWeight: "500",
    margin: "0 8px 8px 0",
    color: theme.palette.accentOne.main,
  },
  header: {
    fontSize: "30px",
    margin: "16px",
  },
  logo: {
    width: "80px",
    height: "80px",
  },
  date: {
    marginBottom: "40px",
  },
  bMargin: {
    marginBottom: "5px",
  },
  betName: {
    fontWeight: "600",
    color: theme.palette.accentOne.main,
  },
  betDetails: {
    marginRight: "20px",
    fontSize: "13px",
  },
  summary: {
    justifyContent: "flex-end",
  },
  terms: {
    margin: "20px 0",
  },
});

export default style;
