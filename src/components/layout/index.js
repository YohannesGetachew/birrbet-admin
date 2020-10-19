import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { CollapseContext, Actions } from "../../contexts/collapse";
import layoutStyle from "./style";

const Layout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };
  const { dispatch } = useContext(CollapseContext);
  useEffect(() => {
    dispatch(Actions.setCollapseHandler({ collapsed, handleCollapse }));
  }, [dispatch, collapsed]);
  const style = layoutStyle({ collapsed });
  return (
    <div className={style.root}>
      <div className={style.topBarC}>{props.topBar}</div>

      <div className={style.sideBarAndContentC}>
        <div className={style.sideBarC}>{props.sideBar}</div>

        <div className={style.contentC}>{props.content}</div>
        <div
          onClick={() => setCollapsed(true)}
          className={style.backdrop}
        ></div>
      </div>
    </div>
  );
};
export default Layout;

Layout.propTypes = {
  topBar: PropTypes.element,
  sideBar: PropTypes.element,
};
