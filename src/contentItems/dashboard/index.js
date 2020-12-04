import React from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Dashboard from "./dashboard";
import {
  getCustomersAnylitics,
  getTransactionAnylitics,
  getTicketAnalysis,
} from "./anyliticsCalculation";
import { useTheme } from "@material-ui/core";
import {
  useGetUsers,
  useGetTransactions,
  useGetTickets,
} from "../../customHooks/dataFetchers";

const DashboardDataFetcher = () => {
  const theme = useTheme();
  const {
    data: userData,
    loading: loadingUserData,
    error: errorLoadingUserData,
  } = useGetUsers();
  const {
    loading: loadingTransactions,
    error: errorLoadingTransactions,
    data: transactions,
  } = useGetTransactions();
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorFetchingTickets,
  } = useGetTickets();

  if (loadingUserData || loadingTransactions || loadingTickets)
    return <Loader />;
  if (errorLoadingUserData || errorLoadingTransactions || errorFetchingTickets)
    return <AlertError />;

  const {
    fluctuation,
    count: customerCount,
    comparisonStartData: customerComparisonStartData,
  } = getCustomersAnylitics(userData.users);
  const {
    transactionCard: {
      count: transactionCount,
      fluctuation: transactionFluctuation,
      comparisonStartData: transactionComparisonStartData,
      direction: transactionDirection,
    },
    transactionGraph: {
      date: dateArray,
      deposit: depositsArray,
      withdrawal: withdrawalArray,
    },
  } = getTransactionAnylitics(transactions.transactions);
  const { tickets, winners } = getTicketAnalysis(ticketData.tickets);
  const anyliticsCardsData = [
    {
      analytics: { direction: "increase", number: fluctuation },
      title: "Customers",
      body: customerCount,
      analyticsStartDate: customerComparisonStartData,
    },
    {
      analytics: {
        direction: transactionDirection,
        number: transactionFluctuation,
      },
      title: "Total income",
      body: transactionCount,
      analyticsStartDate: transactionComparisonStartData,
    },
    {
      analytics: { direction: tickets.direction, number: tickets.fluctuation },
      title: "Total tickets",
      body: tickets.count,
      analyticsStartDate: tickets.comparisonStartData,
    },
    {
      analytics: { direction: winners.direction, number: winners.fluctuation },
      title: "Total winners",
      body: winners.count,
      analyticsStartDate: winners.comparisonStartData,
    },
  ];

  const lineGraphData = {
    labels: dateArray,
    datasets: [
      {
        label: "Deposits",
        data: depositsArray,
        backgroundColor: ["transparent"],
        borderColor: [theme.palette.error.main],
      },
      {
        label: "Withdrawals",
        data: withdrawalArray,
        backgroundColor: ["transparent"],
        borderColor: [theme.palette.accentTwo.main],
      },
    ],
  };

  return (
    <Dashboard
      anyliticsCardsData={anyliticsCardsData}
      lineGraphData={lineGraphData}
    />
  );
};

export default DashboardDataFetcher;
