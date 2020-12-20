import { useQuery } from "@apollo/client";
import { APP } from "../../../graphql/app";

const useGetApp = (options = {}) => {
  const result = useQuery(APP, options);
  return result;
};

export { useGetApp };
