import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React from "react";
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
    <Grid container className={style.root}>
      <Grid item xs={12} md={6} className={style.reportItemC}>
        <Table data={ticketsReportData} columns={ticketsColumns} />
      </Grid>
      <Grid item xs={12} md={6} className={style.reportItemC}>
        <Table
          title="Daily transactions"
          data={transactionReportData}
          columns={transactionReportColumns}
        />
      </Grid>
      <Grid item xs={12} className={style.reportItemC}>
        <Table
          title="Daily registered users"
          data={userReportData}
          columns={userReportColumns}
        />
      </Grid>
    </Grid>
  );
};

export default Report;
