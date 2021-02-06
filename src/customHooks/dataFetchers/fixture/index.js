import { useQuery, useSubscription } from "@apollo/client";
import {
  FIXTURE,
  LIVE_FIXTURE,
  LIVE_ODD,
  LIVE_SCORE,
} from "../../../graphql/fixture";

const useGetFixture = (options = {}) => {
  const result = useQuery(FIXTURE, options);
  return result;
};

const useGetLiveFixture = (options = {}) => {
  const result = useSubscription(LIVE_FIXTURE, options);
  return result;
};

const useGetLiveOdd = (options = {}) => {
  const result = useSubscription(LIVE_ODD, options);
  return result;
};

const useGetLiveScore = (options = {}) => {
  const result = useSubscription(LIVE_SCORE, options);
  return result;
};

export { useGetFixture, useGetLiveFixture, useGetLiveOdd, useGetLiveScore };
