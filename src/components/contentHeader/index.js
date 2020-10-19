import React from "react";
import PropTypes from "prop-types";
import contentHeaderStyle from "./style";

const ContentHeader = ({ title }) => {
  const style = contentHeaderStyle();
  return (
    <div className={style.root}>
      <h1 className={style.title}>{title}</h1>
    </div>
  );
};

ContentHeader.propTypes = {
  title: PropTypes.string,
};

export default ContentHeader;
