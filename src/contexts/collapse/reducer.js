import { SET_COLLAPSE_DATA } from "./actionTypes";

export const collapseReducer = (state, action) => {
  switch (action.type) {
    case SET_COLLAPSE_DATA:
      return action.payload;
    default:
      return state;
  }
};
