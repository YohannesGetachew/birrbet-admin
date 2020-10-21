import React from "react";
import { motion } from "framer-motion";
import { LineGraph } from "../../../graphs";
import lineGraphStyle from "./style";

const LineGraphCard = ({ data }) => {
  const style = lineGraphStyle();
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      className={style.root}
    >
      <div className={style.padded}>
        <h2 className={style.title}>Transactions</h2>
        <LineGraph data={data} />
      </div>
    </motion.div>
  );
};

export default LineGraphCard;
