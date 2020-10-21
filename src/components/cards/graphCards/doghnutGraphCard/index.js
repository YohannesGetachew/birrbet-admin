import React from "react";
import { motion } from "framer-motion";
import { DoghnutGraph } from "../../../graphs";
import barGraphStyle from "./style";

const DoghnutGraphCard = ({ data }) => {
  const style = barGraphStyle();
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.4 }}
      className={style.root}
    >
      <h3 className={style.title}>Top sports</h3>
      <DoghnutGraph data={data} />
    </motion.div>
  );
};

export default DoghnutGraphCard;
