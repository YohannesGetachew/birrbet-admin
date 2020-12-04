import { TRANSACTIONS } from "../../../graphql/transaction";

const { useQuery } = require("@apollo/client");

const useGetTransactions = (options = {}) => {
  const result = useQuery(TRANSACTIONS, options);
  return result;
};

export default useGetTransactions;
