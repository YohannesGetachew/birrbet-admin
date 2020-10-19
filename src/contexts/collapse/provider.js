import React, { useReducer } from "react";

import { collapseReducer } from "./reducer";
import { CollapseContext } from "./context";

const CollapseContextProvider = (props) => {
  const [collapseData, dispatch] = useReducer(collapseReducer, {
    collapsed: false,
    handleCollapse: null,
  });

  return (
    <CollapseContext.Provider value={{ collapseData, dispatch }}>
      {props.children}
    </CollapseContext.Provider>
  );
};

export default CollapseContextProvider;
