import { GET_DEPOSIT_REQUESTS } from "../../../graphql/depositRequest";
const { useQuery } = require("@apollo/client");

const useGetDepositRequests = (options = {}) => {
  const result = useQuery(GET_DEPOSIT_REQUESTS, options);
  return result;
};

export default useGetDepositRequests;
