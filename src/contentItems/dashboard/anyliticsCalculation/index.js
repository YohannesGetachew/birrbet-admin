import getCustomersAnylitics from "./customers";
import getTransactionAnylitics from "./transaction";
import getTicketAnalysis from "./ticket";
import {
  useGetTickets,
  useGetTransactions,
  useGetUsers,
} from "../../../customHooks/dataFetchers";
import { useEffect, useState } from "react";

export { getCustomersAnylitics, getTransactionAnylitics, getTicketAnalysis };

const useGetDashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const {
    data: userData,
    loading: loadingUserData,
    error: errorLoadingUserData,
  } = useGetUsers();
  const {
    loading: loadingTransactions,
    error: errorLoadingTransactions,
    data: transactionData,
  } = useGetTransactions();
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorLoadingTickets,
  } = useGetTickets();

  useEffect(() => {
    if (userData && ticketData && transactionData) {
      setDashboardData("new dashboard data !!!");
    }
  }, [userData, ticketData, transactionData]);

  return {
    loading: loadingUserData || loadingTickets || loadingTransactions,
    error:
      errorLoadingTickets || errorLoadingTransactions || errorLoadingUserData,
    data: dashboardData,
  };
};

export default useGetDashboard;
