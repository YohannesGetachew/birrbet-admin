import { useQuery } from "@apollo/client";
import { FIXTURE } from "../../../graphql/fixture";

const useGetFixture = (options = {}) => {
  const result = useQuery(FIXTURE, options);
  return result;
};

export { useGetFixture };
