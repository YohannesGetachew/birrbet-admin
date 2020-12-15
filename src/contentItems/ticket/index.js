import React from "react";
import { useQuery } from "@apollo/client";
import ShowTickets from "./showTickets";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { TICKETS } from "../../graphql/ticket";
import { Grid } from "@material-ui/core";
import { APP } from "../../graphql/app";
import { PlacedCount, TodaysStake } from "./ticketAnylitics";
import { getFormattedDate } from "../../utils/date";
import useGetCurrentUserRole from "../../customHooks/helpers/useGetCurrentUserRole";

const Tickets = () => {
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorFetchingTickets,
  } = useQuery(TICKETS);
  const {
    data: appData,
    loading: loadingApp,
    error: errorLoadingApp,
  } = useQuery(APP);
  const currentUserRole = useGetCurrentUserRole();
  if (loadingTickets || loadingApp) {
    return <Loader />;
  }
  if (errorFetchingTickets || errorLoadingApp) {
    return (
      <div style={{ display: "inline-block" }}>
        <AlertError message="Something has went wrong. Try reloading or check connection." />
      </div>
    );
  }
  const tickets = ticketData.tickets;
  let todaysTicketCount = { cashierPlaced: 0, onlinePlaced: 0 };
  const TODAY = getFormattedDate(new Date());
  let todaysStake = 0;
  tickets.forEach((ticket) => {
    const ticketPlaceDate = getFormattedDate(ticket.placedDate);
    if (ticket.isPlaced) {
      const isTicketPlacedToday = TODAY === ticketPlaceDate;
      if (isTicketPlacedToday) {
        todaysStake = todaysStake + ticket.stake;
        if (ticket.placerType === "CASHIER")
          todaysTicketCount = {
            ...todaysTicketCount,
            cashierPlaced: todaysTicketCount.cashierPlaced + 1,
          };
        if (ticket.placerType === "CUSTOMER")
          todaysTicketCount = {
            ...todaysTicketCount,
            onlinePlaced: todaysTicketCount.cashierPlaced + 1,
          };
        return;
      }
    }
  });
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <ShowTickets tickets={tickets} app={appData.app} />
        </Grid>
        <Grid item xs={12} md={2}>
          <PlacedCount placerType={"Cashier"} count={todaysTicketCount} />
          <div style={{ margin: "10px" }}></div>
          {currentUserRole !== "CASHIER" && (
            <>
              <PlacedCount placerType={"Online"} count={todaysTicketCount} />
              <div style={{ margin: "10px" }}></div>
            </>
          )}
          <TodaysStake count={todaysStake} />
        </Grid>
      </Grid>
    </>
  );
};

export default Tickets;
