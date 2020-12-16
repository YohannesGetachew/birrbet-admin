import { TICKETS } from "../../../graphql/ticket";
const { useQuery } = require("@apollo/client");

const useGetTickets = (options = {}) => {
  const { data, loading, error } = useQuery(TICKETS, options);
  let statusSetTickets;
  if (data) {
    statusSetTickets = data.tickets.map((ticket) => {
      const doesLoseExist =
        ticket.bets.filter((bet) => bet.status === 1).length > 0;
      if (doesLoseExist) ticket = { ...ticket, status: "LOSE" };
      return ticket;
    });
  }
  return { data: { tickets: statusSetTickets }, loading, error };
};

export default useGetTickets;
