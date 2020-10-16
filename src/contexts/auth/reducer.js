import { ADD_USER, REMOVE_USER } from "./actionTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
};
