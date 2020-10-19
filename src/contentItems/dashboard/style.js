import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  firstRow: {
    // border: "1px solid #000000",
    justifyContent: "center",
  },
  firstRowFirstColumn: {
    // border: "1px solid #000000",
  },
  firstRowFirstColumnItem: {
    // border: "1px solid #000000",
    justifyContent: "center",
    padding: "5px",
    "@media only screen and  (min-width: 450px) and (max-width: 600px)": {
      flexGrow: 0,
      maxWidth: "50%",
      flexBasis: "50%",
      //   flex-grow: 0;
      // max-width: 50%;
      // flex-basis: 50%;
    },
  },
  firstRowSecondColumn: {
    padding: "5px",
    // justifyContent: "center",
  },
  secondRow: {
    justifyContent: "center",
    marginTop: "10px",
  },
  secondRowFirstColumn: {
    padding: "0 10px 20px 0",
  },
  secondRowSecondColumn: {},
}));

export default style;
