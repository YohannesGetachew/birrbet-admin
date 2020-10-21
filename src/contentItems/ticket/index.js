import React from "react";
import { useQuery } from "@apollo/client";
import ShowTickets from "./showTickets";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { TICKETS } from "../../graphql/ticket";
import { Grid } from "@material-ui/core";
import TicketAnalytics from "./ticketAnylitics";
import TicketAnylitics from "./ticketAnylitics";

const Tickets = () => {
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorFetchingTickets,
  } = useQuery(TICKETS);

  const data = [
    {
      _id: "a",
      ticketID: "1",
      status: "pending",
      updatedAt: "12-12-12",
      isPlaced: "yes",
    },
  ];
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <ShowTickets tickets={ticketData.tickets} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TicketAnylitics />
      </Grid>
    </Grid>
  );
};

export default Tickets;