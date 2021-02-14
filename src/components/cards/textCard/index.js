import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import textCardStyle from "./style";
import DownArrow from "@material-ui/icons/ArrowDownwardRounded";
import UpArrow from "@material-ui/icons/ArrowUpwardRounded";

const TextCard = ({ anyliticsData, cardColor, getCardIcon }) => {
  const { title, body, analytics, analyticsStartDate } = anyliticsData;
  const style = textCardStyle({ direction: analytics.direction, cardColor });
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      className={style.root}
    >
      {getCardIcon(style.cardIcon)}
      <h4 className={style.title}>{title}</h4>
      <h3 className={style.body}>{(+body).toFixed(2)}</h3>
      <h5 className={style.analytics}>
        <span>
          {analytics.direction === "increase" ? (
            <UpArrow className={style.icon} />
          ) : (
            <DownArrow className={style.icon} />
          )}
        </span>
        {(+analytics.number).toFixed(2)}
      </h5>
      <p className={style.analyticsStartDate}>{analyticsStartDate}</p>
    </motion.div>
  );
};

export default TextCard;

TextCard.propTypes = {
  anyliticsData: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    analytics: PropTypes.shape({
      direction: PropTypes.string,
      number: PropTypes.string,
    }),
    analyticsStartDate: PropTypes.string,
  }),
  cardColor: PropTypes.func,
};
