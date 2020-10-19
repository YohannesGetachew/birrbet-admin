import React from "react";
import { useQuery } from "@apollo/client";
import ShowTickets from "./showTickets";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { TICKETS } from "../../graphql/ticket";

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
    <div style={{ marginLeft: "100px" }}>
      <ShowTickets tickets={ticketData.tickets} />
    </div>
  );
};

export default Tickets;
