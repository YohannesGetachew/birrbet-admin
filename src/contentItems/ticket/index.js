import React from "react";
import { useQuery } from "@apollo/client";
import ShowTickets from "./showTickets";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { TICKETS } from "../../graphql/ticket";
import { Grid } from "@material-ui/core";
import TicketAnylitics from "./ticketAnylitics";

const Tickets = () => {
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorFetchingTickets,
  } = useQuery(TICKETS);

  if (loadingTickets) {
    return <Loader />;
  }
  if (errorFetchingTickets) {
    return (
      <div style={{ display: "inline-block" }}>
        <AlertError message="Something has went wrong. Try reloading or check connection." />
      </div>
    );
  }
  const tickets = ticketData.tickets;
  let todaysTicketCount = 0;
  const today = Math.round(new Date().getTime());
  const dayInMs = 86400000;
  tickets.forEach((ticket) => {
    if (ticket.isPlaced) {
      const dateDifference = today - ticket.createdAt;
      if (dateDifference <= dayInMs) {
        todaysTicketCount = todaysTicketCount + 1;
        return;
      }
    }
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ShowTickets tickets={tickets} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TicketAnylitics count={todaysTicketCount} />
        </Grid>
      </Grid>
    </>
  );
};

export default Tickets;
