import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { FIXTURES, UPDATE_FIXUTRE } from "../../graphql/fixture";
import { LEAGUES } from "../../graphql/league";
import { useTheme } from "@material-ui/core";
import getFixtureTableColumns from "./fixtureTableColumns";

const handleFixtureUpdate = async (id, isAvailable, mutate) => {
  try {
    await mutate({
      variables: { id, updateInput: { isAvailable: !isAvailable } },
    });
  } catch (err) {
    return;
  }
};

const Fixture = () => {
  const {
    data: fixturesData,
    error: errorLoadingFixtures,
    loading: loadingFixtures,
  } = useQuery(FIXTURES);

  const {
    data: leagueData,
    error: errorLoadingLeagues,
    loading: loadingLeagues,
  } = useQuery(LEAGUES);

  const [
    updateFixture,
    { data: league, loading: isUpdatingFixture, error: failedMutatingFixture },
  ] = useMutation(UPDATE_FIXUTRE);

  const theme = useTheme();

  if (loadingFixtures || loadingLeagues) return <Loader />;

  if (errorLoadingFixtures || errorLoadingLeagues) return <AlertError />;

  const reorganizedFixtures = fixturesData.fixtures.map((fixture) => {
    const leagueOfFixture = leagueData?.leagues.find(
      (league) => league.id === fixture.league.toString()
    );
    if (leagueOfFixture) {
      return { ...fixture, sport: "Soccer", league: leagueOfFixture.name };
    }
    return { ...fixture, sport: "Soccer", league: fixture.league };
  });
  console.log(reorganizedFixtures);
  return (
    <>
      {failedMutatingFixture && <AlertError />}
      <Table
        columns={getFixtureTableColumns(
          theme,
          updateFixture,
          handleFixtureUpdate,
          isUpdatingFixture
        )}
        data={reorganizedFixtures}
      />
    </>
  );
};

export default Fixture;

// date: "2020-10-15T14:30:00+03:00"
// id: 625511
// isAvailable: true
// league: 115
// status: "NS"
// teams: {__typename: "Teams", home: {…}, away: {…}}
// __typename: "Fixture"
// _id: "5f882f576a78001cdbae78b1"

// date: "2020-10-15T14:30:00+03:00"
// id: 625511
// isAvailable: true
// league: "Svenska Cupen"
// sport: "Soccer"
// status: "NS"
// teams: {__typename: "Teams", home: {…}, away: {…}}
// __typename: "Fixture"
// _id: "5f882f576a78001cdbae78b1"
