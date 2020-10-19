import React, { useContext } from "react";
import { Menu } from "@material-ui/icons";
import { CollapseContext } from "../../contexts/collapse";
import topBarStyle from "./style";

const TopBar = () => {
  const {
    collapseData: { handleCollapse },
  } = useContext(CollapseContext);
  const style = topBarStyle();
  return (
    <div className={style.root}>
      <div className={style.collapseIconC}>
        <Menu className={style.collapseIcon} onClick={handleCollapse} />
      </div>
    </div>
  );
};

export default TopBar;
