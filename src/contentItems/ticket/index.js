import React, { useContext } from "react";
import ShowTickets from "./showTickets";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { Grid } from "@material-ui/core";
import { useGetApp } from "../../customHooks/dataFetchers";
import PlacedCount from "./ticketAnylitics";
import { getFormattedDate } from "../../utils/date";
import useGetCurrentUserRole from "../../customHooks/helpers/useGetCurrentUserRole";
import { useGetTickets } from "../../customHooks/dataFetchers";
import { AuthContext } from "../../contexts/auth";

const Tickets = () => {
  const { authData } = useContext(AuthContext);
  const {
    data: ticketData,
    loading: loadingTickets,
    error: errorFetchingTickets,
  } = useGetTickets({ variables: { latest: true } });

  const {
    data: appData,
    loading: loadingApp,
    error: errorLoadingApp,
  } = useGetApp();
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
  let tickets = ticketData.tickets;
  let todaysTicketCount = { cashierPlaced: 0, onlinePlaced: 0 };
  const TODAY = getFormattedDate(new Date());
  let todaysStake = { cashierPlacedStake: 0, onlinePlacedStake: 0 };

  let ticketsByUserId = tickets;
  if (currentUserRole === "CASHIER") {
    ticketsByUserId = tickets.filter(
      (ticket) => ticket.userID === authData.userData._id
    );
  }
  ticketsByUserId.forEach((ticket) => {
    if (ticket.isPlaced) {
      const ticketPlaceDate = getFormattedDate(ticket.placedDate);
      const isTicketPlacedToday = TODAY === ticketPlaceDate;
      if (isTicketPlacedToday) {
        if (ticket.placerType === "CASHIER") {
          todaysStake = {
            ...todaysStake,
            cashierPlacedStake: todaysStake.cashierPlacedStake + ticket.stake,
          };
          todaysTicketCount = {
            ...todaysTicketCount,
            cashierPlaced: todaysTicketCount.cashierPlaced + 1,
          };
        }
        if (ticket.placerType === "CUSTOMER") {
          todaysStake = {
            ...todaysStake,
            onlinePlacedStake: todaysStake.onlinePlacedStake + ticket.stake,
          };
          todaysTicketCount = {
            ...todaysTicketCount,
            onlinePlaced: todaysTicketCount.onlinePlaced + 1,
          };
        }
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
          <PlacedCount
            placerType={"Cashier"}
            anylitics={{
              tickets: todaysTicketCount.cashierPlaced,
              amount: todaysStake.cashierPlacedStake,
            }}
            userRole={currentUserRole}
          />
          <div style={{ margin: "10px" }}></div>
          {currentUserRole !== "CASHIER" && (
            <>
              <PlacedCount
                placerType={"Online"}
                anylitics={{
                  tickets: todaysTicketCount.onlinePlaced,
                  amount: todaysStake.onlinePlacedStake,
                }}
                userRole={currentUserRole}
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Tickets;
export { ShowTickets };
