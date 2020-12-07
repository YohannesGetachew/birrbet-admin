import { useQuery } from "@apollo/client";
import { SHOPS } from "../../../graphql/shop";

const useGetShops = (options = {}) => {
  const result = useQuery(SHOPS, options);
  return result;
};

export default useGetShops;
