import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  scrollable: {
    height: "calc(100% - 50px)",
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    // "&::-webkit-scrollbar-track": {
    //   background: "#e0e0e0",
    //   borderRadius: "10px",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   background: "#cccccc",
    //   opacity: 0.1,
    //   borderRadius: "10px",
    // },
    "scrollbar-width": "none",
  },
  logoC: {
    alignItems: "center",
    justifyContent: "center",
    // border: "1px solid #000000",
    marginTop: "10px",
    marginBottom: "30px",
  },
  navigationC: {
    // marginTop: "30px",
  },
  nonScrollable: {
    height: "50px",
    position: "absolute",
    bottom: 0,
    padding: "5px",
  },
}));

export default style;
