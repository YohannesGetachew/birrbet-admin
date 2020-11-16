import React from "react";
import PropTypes from "prop-types";
import contentHeaderStyle from "./style";

const ContentHeader = ({ title, description }) => {
  const style = contentHeaderStyle();
  return (
    <div className={style.root}>
      <h1 className={style.title}>{title}</h1>
      <span className={style.subtitle}>{description}</span>
    </div>
  );
};

ContentHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ContentHeader;
