import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth";
import { TICKETS } from "../../../graphql/ticket";
import { useGetAdminsShop } from "../shops";
const { useQuery } = require("@apollo/client");

const useGetTickets = (options = {}) => {
  const { data, loading, error } = useQuery(TICKETS, options);
  const { authData } = useContext(AuthContext);
  const { userData } = authData;
  const {
    adminsShop,
    error: errorLoadingAdminShop,
    loading: loadingAdminShop,
  } = useGetAdminsShop(userData._id, userData.role !== "ADMIN");
  let statusSetTickets;
  if (data) {
    statusSetTickets = data.tickets.map((ticket) => {
      const doesLoseExist =
        ticket.bets.filter((bet) => bet.status === 1).length > 0;
      if (doesLoseExist) ticket = { ...ticket, status: "LOSE" };
      return ticket;
    });
    if (adminsShop) {
      statusSetTickets = filterTicketsForRole(
        statusSetTickets,
        userData,
        adminsShop
      );
    }
  }
  return {
    data: { tickets: statusSetTickets },
    loading: loading || loadingAdminShop,
    error: error || errorLoadingAdminShop,
  };
};

export default useGetTickets;

const filterTicketsForRole = (tickets, currentUser, adminsShop) => {
  const { role } = currentUser;
  let newTickets;
  if (role === "ADMIN") {
    newTickets = tickets.filter((ticket) => {
      const { isPlaced, placerType } = ticket;
      const doesCashierPlacedTicketBelongToShop =
        placerType === "CASHIER" &&
        ticket.user.belongsToShop === adminsShop._id;

      return !isPlaced || doesCashierPlacedTicketBelongToShop;
    });
  }
  if (role === "CASHIER") {
    newTickets = tickets.filter((ticket) => {
      const { isPlaced, placerType } = ticket;
      const doesCashierPlacedTicketBelongToShop =
        placerType === "CASHIER" &&
        ticket.user.belongsToShop === currentUser.belongsToShop;
      return !isPlaced || doesCashierPlacedTicketBelongToShop;
    });
  }
  if (role === "SUPER_ADMIN") newTickets = tickets;

  return newTickets;
};

export const getWinnerTickets = (tickets) => {
  const winnerTickets = tickets.filter((ticket) => ticket.status === "WIN");
  return winnerTickets;
};

export const getTicketBranch = (ticket) => {
  const { isPlaced, placerType, shop } = ticket;
  if (!isPlaced) return "Not Placed";
  if (placerType === "CUSTOMER") return "Online";
  return shop?.branchName;
};
