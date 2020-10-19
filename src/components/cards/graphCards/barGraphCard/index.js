import React from "react";
import { motion } from "framer-motion";
import { BarGraph } from "../../../graphs";
import barGraphStyle from "./style";

const BarGraphChart = () => {
  const style = barGraphStyle();
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className={style.root}
    >
      <h3 className={style.title}>Top sports</h3>
      <BarGraph />
    </motion.div>
  );
};

export default BarGraphChart;
