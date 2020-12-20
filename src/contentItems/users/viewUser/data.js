import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import {
  useGetApp,
  useGetTickets,
  useGetUser,
} from "../../../customHooks/dataFetchers";
import { TRANSACTIONS } from "../../../graphql/transaction";

const useGetUserData = (userId) => {
  const {
    loading: loadingUser,
    data: userResult,
    error: errorLoadingUser,
  } = useGetUser({ variables: { id: userId } });
  const [
    getTransactions,
    {
      loading: loadingTransactions,
      data: transactionsResult,
      error: errorLoadingTransactions,
    },
  ] = useLazyQuery(TRANSACTIONS);
  const {
    loading: loadingTickets,
    data: ticketsResult,
    error: errorLoadingTickets,
  } = useGetTickets({ variables: { userID: userId } });

  const {
    loading: loadingApp,
    error: errorLoadingApp,
    data: appResult,
  } = useGetApp();

  useEffect(() => {
    if (userResult) {
      const { role, username } = userResult.user;
      let variables = {};
      if (role === "CASHIER") {
        variables.cashierUsername = username;
      }
      if (role === "CUSTOMER") {
        variables.customerUsername = username;
      }
      getTransactions({ variables: variables });
    }
  }, [userResult, getTransactions]);

  return {
    loading:
      loadingTickets ||
      loadingTransactions ||
      loadingUser ||
      loadingApp ||
      !transactionsResult,
    error:
      errorLoadingTickets ||
      errorLoadingTransactions ||
      errorLoadingUser ||
      errorLoadingApp,
    data: { userResult, transactionsResult, ticketsResult, appResult },
  };
};

export default useGetUserData;
