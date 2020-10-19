import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import textCardStyle from "./style";
import DownArrow from "@material-ui/icons/ArrowDownwardRounded";
import UpArrow from "@material-ui/icons/ArrowUpwardRounded";

const TextCard = ({ title, body, analytics, analyticsStartDate }) => {
  const style = textCardStyle({ direction: analytics.direction });
  return (
    <motion.div
      //   animate={{ x: 1 }}
      initial={{ scale: 1.4 }}
      animate={{ scale: 1 }}
      className={style.root}
    >
      <h3 className={style.title}>Customers</h3>
      <h3 className={style.body}>43</h3>
      <h5 className={style.analytics}>
        <span>
          {analytics.direction === "increase" ? (
            <UpArrow className={style.icon} />
          ) : (
            <DownArrow className={style.icon} />
          )}
        </span>
        7%
      </h5>
      <p className={style.analyticsStartDate}>All time</p>
    </motion.div>
  );
};

export default TextCard;

TextCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  analytics: PropTypes.shape({
    direction: PropTypes.string,
    number: PropTypes.number,
  }),
  analyticsStartDate: PropTypes.string,
};
