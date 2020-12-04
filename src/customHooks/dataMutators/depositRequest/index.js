import {
  CONFIRM_DEPOSIT_REQUEST,
  DELETE_DEPOSIT_REQUEST,
  DENY_DEPOSIT_REQUEST,
} from "../../../graphql/depositRequest";
const { useMutation } = require("@apollo/client");

export const useConfirmDepositRequest = (options = {}) => {
  const result = useMutation(CONFIRM_DEPOSIT_REQUEST, options);
  return result;
};

export const useDeleteDepositRequest = (options = {}) => {
  const result = useMutation(DELETE_DEPOSIT_REQUEST, options);
  return result;
};

export const useDenyDepositRequest = (options = {}) => {
  const result = useMutation(DENY_DEPOSIT_REQUEST, options);
  return result;
};
