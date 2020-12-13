import React from "react";
import { useQuery } from "@apollo/client";
import ShowTickets from "./showTickets";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { TICKETS } from "../../graphql/ticket";
import { Grid } from "@material-ui/core";
import { APP } from "../../graphql/app";
import TicketAnylitics from "./ticketAnylitics";
import { getFormattedDate, convertFromUnix } from "../../utils/date";

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
  tickets.forEach((ticket) => {
    const ticketPlaceDate = convertFromUnix(ticket.updatedAt);
    if (ticket.isPlaced) {
      const isTicketPlacedToday = TODAY === ticketPlaceDate;
      if (isTicketPlacedToday) {
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
          <TicketAnylitics placerType={"Cashier"} count={todaysTicketCount} />
          <div style={{ margin: "10px" }}></div>
          <TicketAnylitics placerType={"Online"} count={todaysTicketCount} />
        </Grid>
      </Grid>
    </>
  );
};

export default Tickets;
