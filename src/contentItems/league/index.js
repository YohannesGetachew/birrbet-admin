import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { LEAGUES, UPDATE_LEAGUE } from "../../graphql/league";
import getLeagueTableColumns from "./leagueTableColumns";
import { useTheme } from "@material-ui/core";

const handleLeagueUpdate = async (isAvailable, id, mutate) => {
  try {
    await mutate({
      variables: {
        id,
        updateInput: { isAvailable: isAvailable ? false : true },
      },
    });
    console.log("success");
  } catch (err) {
    return;
  }
};

const Leagues = () => {
  const {
    data: leagues,
    loading: loadingLeagues,
    error: errorLoadingLeagues,
  } = useQuery(LEAGUES);

  const [
    mutate,
    { data: updatedLeague, loading: isUpdating, error: isLeageUpdateFailed },
  ] = useMutation(UPDATE_LEAGUE);

  const theme = useTheme();

  if (loadingLeagues) return <Loader />;
  if (errorLoadingLeagues) return <AlertError />;
  return (
    <>
      {isLeageUpdateFailed && <AlertError />}
      <Table
        columns={getLeagueTableColumns(
          theme,
          handleLeagueUpdate,
          mutate,
          isUpdating
        )}
        data={leagues.leagues}
      />
    </>
  );
};
export default Leagues;

//   country: "World"
//   id: "524"
//   isAvailable: true
//   name: "Olympics Women"
//   order: 0
//   __typename: "League"
//   _id: "5f8acd68fd7c7d4c8f1ac2e5"
