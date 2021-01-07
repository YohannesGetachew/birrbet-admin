import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth";
import { TRANSACTIONS } from "../../../graphql/transaction";
import { useGetAdminsShop } from "../shops";

const { useQuery } = require("@apollo/client");

const useGetTransactions = (options = {}) => {
  const { authData } = useContext(AuthContext);
  const { role, _id, belongsToShop } = authData.userData;
  const { data, error, loading } = useQuery(TRANSACTIONS, options);
  const {
    adminsShop,
    error: errorLoadingAdminsShop,
    loading: loadingAdminsShop,
  } = useGetAdminsShop(_id, role !== "ADMIN");
  let reorganizedTransactions;
  if (data) {
    if (role === "ADMIN" && adminsShop) {
      reorganizedTransactions = data.transactions.map((transaction) => ({
        ...transaction,
        cashier:
          transaction.cashier.belongsToShop === adminsShop._id
            ? transaction.cashier
            : { ...transaction.cashier, username: "REMOTE CASHIER" },
      }));
    }
    if (role === "CASHIER") {
      reorganizedTransactions = data.transactions.map((transaction) => {
        return {
          ...transaction,
          cashier:
            transaction.cashier.belongsToShop === belongsToShop
              ? transaction.cashier
              : { ...transaction.cashier, username: "REMOTE CASHIER" },
        };
      });
    }
    if (role === "SUPER_ADMIN") reorganizedTransactions = data.transactions;
  }
  return {
    data: { transactions: reorganizedTransactions },
    error: error || errorLoadingAdminsShop,
    loading: loading || loadingAdminsShop,
  };
};

export default useGetTransactions;
