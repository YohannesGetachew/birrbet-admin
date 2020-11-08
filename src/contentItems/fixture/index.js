import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { FIXTURES, UPDATE_FIXUTRE } from "../../graphql/fixture";
import { LEAGUES } from "../../graphql/league";
import { useTheme } from "@material-ui/core";
import getFixtureTableColumns from "./fixtureTableColumns";
import { SPORTS } from "../../graphql/sport";
import { COUNTRIES } from "../../graphql/country";

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

  const {
    data: sportData,
    error: errorLoadingSport,
    loading: loadingSport,
  } = useQuery(SPORTS);

  const {
    data: countriesData,
    error: errorLoadingCountries,
    loading: loadingCountries,
  } = useQuery(COUNTRIES);

  const [
    updateFixture,
    { data: league, loading: isUpdatingFixture, error: failedMutatingFixture },
  ] = useMutation(UPDATE_FIXUTRE);

  const theme = useTheme();

  if (loadingFixtures || loadingLeagues || loadingSport || loadingCountries)
    return <Loader />;

  if (
    errorLoadingFixtures ||
    errorLoadingLeagues ||
    errorLoadingSport ||
    errorLoadingCountries
  )
    return <AlertError />;
  const fixturesWithLeague = fixturesData.fixtures.map((fixture) => {
    const leagueOfFixture = leagueData?.leagues.find(
      (league) => league.id === fixture.leagueId.toString()
    );
    if (leagueOfFixture) {
      return { ...fixture, league: leagueOfFixture.name };
    }
    return { ...fixture, league: fixture.league };
  });

  const fixturesWithSport = fixturesWithLeague.map((fixture) => {
    const sportId = fixture.sportId;
    const sport = sportData?.sports.find((sport) => sport.id === sportId);
    if (sport) {
      return { ...fixture, sportName: sport.name };
    }
  });

  const fixturesWithCountries = fixturesWithSport.map((fixture) => {
    const countryId = fixture.countryId;
    const country = countriesData?.countries.find(
      (country) => country.id === countryId
    );
    if (country) {
      return { ...fixture, countryName: country.name };
    }
  });

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
        data={fixturesWithCountries}
      />
    </>
  );
};

export default Fixture;
