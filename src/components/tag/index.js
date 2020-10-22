import React from "react";
import PropTypes from "prop-types";
import tagStyle from "./style";

const Tag = ({ label, textColor, backgroundColor }) => {
  const style = tagStyle({ textColor, backgroundColor });
  return <span className={style.root}>{label}</span>;
};

export default Tag;

Tag.propTypes = {
  lable: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};
