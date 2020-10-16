import React, { useState } from "react";
import layoutStyle from "./style";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const style = layoutStyle({ collapsed });
  return (
    <div className={style.root}>
      <div className={style.topBar}>
        <button onClick={() => setCollapsed(!collapsed)}>top</button>
      </div>

      <div className={style.sideBarAndContentC}>
        <div collapsed={collapsed} className={style.sideBar}>
          <button onClick={() => setCollapsed(!collapsed)}>side</button>
        </div>

        <div className={style.content}></div>
        <div
          onClick={() => setCollapsed(true)}
          collapsed={collapsed}
          className={style.backdrop}
        ></div>
      </div>
    </div>
  );
};
export default Layout;
