import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    // backgroundColor: `${theme.palette.primary.dark}`,
    // padding: "10px",
    marginTop: "10px",
  },
  addAdvertisementC: {
    textAlign: "right",
  },
  addAdvertisement: {
    marginBottom: "8px",
    padding: "5px 30px",
    backgroundColor: theme.palette.accentTwo.dark,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.accentTwo.main,
      color: theme.palette.primary.main,
    },
  },
  imageC: {
    padding: "20px",
    // [theme.breakpoints.down("xs")]: {
    //   padding: " 20px 0 20px 0",
    // },
    // boxShadow: theme.shadows[4],
  },
  imageCard: {
    boxShadow: theme.shadows[4],
  },
  image: {
    verticalAlign: "middle",
    borderRadius: "4px 4px 0 0",
    width: "100%",
    height: "150px",
    objectFit: "cover",
    transition: "all 0.8s",
    "&:hover": {
      boxShadow: theme.shadows[10],
    },
  },
  imageInfo: {
    backgroundColor: theme.palette.primary.light,
    color: `${theme.palette.secondary.main}ee`,
    marginTop: 0,
    padding: "10px",
    borderRadius: "0 0 4px 4px",
    justifyContent: "space-between",
  },
  advertisemetTitle: {
    fontSize: "25px",
    fontWeight: "700",
    marginBottom: "8px",
    marginLeft: "8px",
    fontStyle: "italic",
  },
  position: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "12px",
    marginLeft: "8px",
    color: theme.palette.secondary.light,
  },
  action: {
    marginRight: "8px",
  },
  noAdvertisements: {
    color: theme.palette.accentOne.light,
  },
}));

export default style;
