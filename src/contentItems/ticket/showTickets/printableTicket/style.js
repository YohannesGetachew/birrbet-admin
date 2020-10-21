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
    backgroundColor: theme.palette.accentOne.dark,
    border: `4px solid ${theme.palette.accentTwo.dark}`,
    padding: "4px 8px 4px 8px",
    borderRadius: "4px",
    color: theme.palette.primary.light,
  },
  date: {
    marginBottom: "40px",
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
