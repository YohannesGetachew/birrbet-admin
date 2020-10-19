import React from "react";

import { LineGraph } from "../../../graphs";
import lineGraphStyle from "./style";

const LineGraphCard = () => {
  const style = lineGraphStyle();
  return (
    <div className={style.root}>
      <div className={style.padded}>
        <h2 className={style.title}>Transactions</h2>
        <LineGraph />
      </div>
    </div>
  );
};

export default LineGraphCard;
