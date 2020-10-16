import { ADD_USER, REMOVE_USER } from "./actionTypes";

export const addUser = (user = null) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
