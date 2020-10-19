import { SET_COLLAPSE_DATA } from "./actionTypes";

export const setCollapseHandler = (collapseData) => {
  return {
    type: SET_COLLAPSE_DATA,
    payload: collapseData,
  };
};
