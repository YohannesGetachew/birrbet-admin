import { useQuery } from "@apollo/client";
import { Grid, Tabs, Tab } from "@material-ui/core";
import React, { useState } from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { TICKETS } from "../../graphql/ticket";
import { TRANSACTIONS } from "../../graphql/transaction";
import { USERS } from "../../graphql/user";
import getTransactionsReportTableInfo from "./transactionReport";
import { useTheme } from "@material-ui/core";
import getUsersReportTableInfo from "./usersReport";
import reportStyle from "./style";
import getTicketsAndWinnersTableInfo from "./ticketsAndWinners";

// daily tickets
// daily winners
// daily transactions
// daily user registers
const Report = () => {
  const {
    data: userData,
    loading: loadingUserData,
    error: errorLoadingUserData,
  } = useQuery(USERS, { variables: { role: "CUSTOMER" } });
  const {
    loading: loadingTransactions,
    error: errorLoadingTransactions,
    data: transactions,
  } = useQuery(TRANSACTIONS);
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorFetchingTickets,
  } = useQuery(TICKETS);

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const theme = useTheme();
  const style = reportStyle();

  if (loadingUserData || loadingTransactions || loadingTickets)
    return <Loader />;
  if (errorLoadingUserData || errorLoadingTransactions || errorFetchingTickets)
    return <AlertError />;

  const {
    data: userReportData,
    columns: userReportColumns,
  } = getUsersReportTableInfo(userData.users);
  const {
    data: transactionReportData,
    columns: transactionReportColumns,
  } = getTransactionsReportTableInfo(transactions.transactions, theme);
  const {
    data: ticketsReportData,
    columns: ticketsColumns,
  } = getTicketsAndWinnersTableInfo(ticketData.tickets);
  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="reports-tab"
      >
        <Tab label="Tickets" />
        <Tab label="Users" />
        <Tab label="Transactions" />
      </Tabs>
      <div className={style.tabBody}>
        {currentTab === 0 && (
          <Table
            title="Daily tickets"
            data={ticketsReportData}
            columns={ticketsColumns}
          />
        )}

        {currentTab === 1 && (
          <Table
            title="Daily registered users"
            data={userReportData}
            columns={userReportColumns}
          />
        )}

        {currentTab === 2 && (
          <Table
            title="Daily transactions"
            data={transactionReportData}
            columns={transactionReportColumns}
          />
        )}
      </div>
    </>
  );
};

export default Report;
