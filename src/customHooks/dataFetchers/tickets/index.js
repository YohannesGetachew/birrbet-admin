import { TICKETS } from "../../../graphql/ticket";
const { useQuery } = require("@apollo/client");

const useGetTickets = (options = {}) => {
  const result = useQuery(TICKETS, options);
  return result;
};

export default useGetTickets;
