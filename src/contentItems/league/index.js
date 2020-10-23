import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { LEAGUES, UPDATE_LEAGUE } from "../../graphql/league";

const Leagues = () => {
  const {
    data: leagues,
    loading: loadingLeagues,
    error: errorLoadingLeagues,
  } = useQuery(LEAGUES);
  const [
    updateLeague,
    { data: league, loading: isUpdating, error: isFailed },
  ] = useMutation(UPDATE_LEAGUE);

  return "League";
};
export default Leagues;
