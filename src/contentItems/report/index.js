import { useQuery } from "@apollo/client";
import {
  Grid,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { TRANSACTIONS } from "../../graphql/transaction";
import getTransactionsReportTableInfo from "./transactionReport";
import { useTheme } from "@material-ui/core";
import {
  getCustomersReportData,
  getCashiersReportDataAndColumns,
} from "./usersReport";
import reportStyle from "./style";
import getTicketsAndWinnersTableInfo from "./ticketsAndWinners";
import { APP } from "../../graphql/app";
import { useGetTickets, useGetUsers } from "../../customHooks/dataFetchers";
import useGetCurrentUserRole from "../../customHooks/helpers/useGetCurrentUserRole";
import { sortShopsByTickets } from "../../customHooks/dataFetchers/shops";
import { shopTicketsSummary, winnerReportSummary } from "./shopReport";
import { getWinnerTickets } from "../../customHooks/dataFetchers/tickets";
import { convertFromUnix } from "../../utils/date";
import { calculateTicketReturns } from "../../utils/ticketCalculation";

// daily tickets
// daily winners
// daily transactions
// daily user registers
const Report = () => {
  const {
    data: userData,
    loading: loadingUserData,
    error: errorLoadingUserData,
  } = useGetUsers();
  const {
    loading: loadingTransactions,
    error: errorLoadingTransactions,
    data: transactions,
  } = useQuery(TRANSACTIONS);
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorFetchingTickets,
  } = useGetTickets();
  const {
    data: appData,
    loading: loadingApp,
    error: errorLoadingApp,
  } = useQuery(APP);

  const currentUserRole = useGetCurrentUserRole();

  const [currentTab, setCurrentTab] = useState("tickets");
  const [shopsTab, setShopsTab] = useState("summary");

  const theme = useTheme();
  const style = reportStyle();

  if (loadingUserData || loadingTransactions || loadingTickets || loadingApp)
    return <Loader />;
  if (
    errorLoadingUserData ||
    errorLoadingTransactions ||
    errorFetchingTickets ||
    errorLoadingApp
  )
    return <AlertError />;

  const {
    data: ticketsReportData,
    columns: ticketsColumns,
    allTimeUserWon,
    allTimeSystemWon,
  } = getTicketsAndWinnersTableInfo(ticketData.tickets, appData.app);

  let customers = [];
  let cashiers = [];
  userData.users.forEach((user) => {
    if (user.role === "CASHIER") cashiers.push(user);
    if (user.role === "CUSTOMER") customers.push(user);
  });

  const filteredTransactionsForAdmin = transactions.transactions.filter(
    (transaction) => {
      return cashiers.find(
        (cashier) => cashier._id === transaction.cashier._id
      );
    }
  );

  const filteredTransactions =
    currentUserRole === "SUPER_ADMIN"
      ? transactions.transactions
      : filteredTransactionsForAdmin;
  const {
    data: transactionReportData,
    columns: transactionReportColumns,
  } = getTransactionsReportTableInfo(filteredTransactions, theme);

  const {
    data: customersReportData,
    columns: customersReportColumns,
  } = getCustomersReportData(customers);

  const shopsToTicketsMap = sortShopsByTickets(ticketData.tickets);

  const shopsToTicketsReport = shopsToTicketsMap.map((shopToTicketsMap) => {
    const shopTicketsReport = getTicketsAndWinnersTableInfo(
      shopToTicketsMap.tickets,
      appData.app
    );
    return { shop: shopToTicketsMap.shop, shopTicketsReport };
  });

  const winnerTickets = getWinnerTickets(ticketData.tickets);

  return (
    <>
      <div className={style.selectC}>
        <span className={style.chooseReport}>Choose report</span>
        <TextField
          // className={style.root}
          select
          value={currentTab}
          onChange={(e) => setCurrentTab(e.target.value)}
        >
          <MenuItem key={"tickets"} value={"tickets"}>
            Tickets
          </MenuItem>
          {currentUserRole === "ADMIN" && (
            <MenuItem key={"cashiers"} value={"cashiers"}>
              Cashiers
            </MenuItem>
          )}
          <MenuItem key={"transactions"} value={"transactions"}>
            Transactions
          </MenuItem>
          {currentUserRole === "SUPER_ADMIN" && (
            <MenuItem key={"customers"} value={"customers"}>
              Customers
            </MenuItem>
          )}
          {currentUserRole === "SUPER_ADMIN" && (
            <MenuItem key={"shops"} value={"shops"}>
              Shops
            </MenuItem>
          )}
        </TextField>
      </div>
      <div className={style.tabBody}>
        {currentTab === "tickets" && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Table
                title="Daily tickets"
                data={ticketsReportData}
                columns={ticketsColumns}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <div
                className={
                  style.allTimeTicketIncome + " " + style.allTimeUserWon
                }
              >
                <h2 className={style.allTimeTitle}>All time user won</h2>
                <h6 className={style.allTimeNumber}>{allTimeUserWon}</h6>
              </div>

              <div
                className={
                  style.allTimeTicketIncome + " " + style.allTimeSystemWon
                }
              >
                <h2 className={style.allTimeTitle}>All time system won</h2>
                <h6 className={style.allTimeNumber}>{allTimeSystemWon}</h6>
              </div>
            </Grid>
          </Grid>
        )}
        {currentTab === "cashiers" &&
          (cashiers.length === 0 ? (
            <h1>Sorry no cashiers placed tickets</h1>
          ) : (
            cashiers.map((cashier) => {
              const { data, columns } = getCashiersReportDataAndColumns(
                cashier,
                ticketData.tickets
              );
              return (
                <div key={cashier._id} className={style.cashierTable}>
                  <Table
                    title={cashier.firstName + " " + cashier.lastName}
                    data={data}
                    columns={columns}
                  />
                </div>
              );
            })
          ))}
        {currentTab === "transactions" && (
          <Table
            title="Daily transactions report "
            data={transactionReportData}
            columns={transactionReportColumns}
          />
        )}
        {currentTab === "customers" && (
          <Table
            title="Daily registered customers"
            data={customersReportData}
            columns={customersReportColumns}
          />
        )}
        {currentTab === "shops" && (
          <>
            <div style={{ textAlign: "right", marginBottom: "4px" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShopsTab("daily")}
              >
                Daily
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShopsTab("summary")}
                style={{ marginLeft: "5px" }}
              >
                Summary
              </Button>
            </div>
            {shopsTab === "daily" ? (
              shopsToTicketsReport.map((shopReport) => {
                return (
                  <Grid key={shopReport.shop._id} container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Table
                        title={shopReport.shop.branchName}
                        data={shopReport.shopTicketsReport.data}
                        columns={shopReport.shopTicketsReport.columns}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div
                        className={
                          style.allTimeTicketIncome + " " + style.allTimeUserWon
                        }
                      >
                        <h2 className={style.allTimeTitle}>
                          All time user won
                        </h2>
                        <h6 className={style.allTimeNumber}>
                          {shopReport.shopTicketsReport.allTimeUserWon}
                        </h6>
                      </div>

                      <div
                        className={
                          style.allTimeTicketIncome +
                          " " +
                          style.allTimeSystemWon
                        }
                      >
                        <h2 className={style.allTimeTitle}>
                          All time system won
                        </h2>
                        <h6 className={style.allTimeNumber}>
                          {shopReport.shopTicketsReport.allTimeSystemWon}
                        </h6>
                      </div>
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <>
                <Table
                  title="Sales report"
                  data={shopsToTicketsMap.map((shopToTicketsMap) => {
                    const { tickets } = shopToTicketsMap;
                    const beforeVat = tickets.reduce(
                      (ac, cu) => ac + cu.stake,
                      0
                    );
                    return {
                      noOfPlaced: tickets.length,
                      beforeVat,
                      totalStake: beforeVat - beforeVat * 0.15,
                      vat: "15%",
                      branchName: shopToTicketsMap.shop.branchName,
                    };
                  })}
                  columns={shopTicketsSummary}
                />
                <div style={{ margin: "16px" }}></div>
                <Table
                  title="Winning payment"
                  data={winnerTickets.map((ticket) => {
                    const { stake, totalOdds } = ticket;
                    const ticketReturns = calculateTicketReturns(
                      stake,
                      totalOdds,
                      appData.app
                    );
                    return {
                      ...ticket,
                      grossWinAmount: (
                        ticketReturns.possibleWin - ticketReturns.incomeTax
                      ).toFixed(2),
                      netPayment: ticketReturns.possibleWin,
                      incomeTax: ticketReturns.incomeTax,
                      updatedAt: convertFromUnix(ticket.updatedAt),
                    };
                  })}
                  columns={winnerReportSummary}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Report;
