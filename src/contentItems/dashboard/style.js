import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  firstRow: {
    justifyContent: "center",
  },
  firstRowFirstColumn: {},
  firstRowSecondColumn: {
    padding: "5px",
  },
  secondRow: {
    justifyContent: "center",
    marginTop: "10px",
  },
  secondRowFirstColumn: {
    padding: "0 10px 20px 0",
  },
  secondRowSecondColumn: {
    padding: "5px",
  },
}));

export default style;
