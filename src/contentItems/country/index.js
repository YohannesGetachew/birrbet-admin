import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { COUNTRIES, UPDATE_COUNTRY } from "../../graphql/country";
import getCountryColumns from "./countryTableColumns";
import { useTheme } from "@material-ui/core";

const handleCountryUpdate = async (id, isAvailable, order, mutate) => {
  try {
    await mutate({
      variables: { id, updateInput: { isAvailable: !isAvailable, order } },
    });
  } catch (err) {
    return;
  }
};

const Country = () => {
  const {
    data: countriesData,
    loading: loadingCountries,
    error: errorLoadingCountries,
  } = useQuery(COUNTRIES);
  const [
    updateCountry,
    { loading: isUpdatingCountry, error: errorUpdatingCountry },
  ] = useMutation(UPDATE_COUNTRY);
  const theme = useTheme();
  if (loadingCountries) return <Loader />;
  if (errorLoadingCountries) return <AlertError />;
  return (
    <>
      {errorUpdatingCountry && <AlertError />}
      <Table
        data={countriesData.countries}
        columns={getCountryColumns(
          theme,
          updateCountry,
          handleCountryUpdate,
          isUpdatingCountry
        )}
      />
    </>
  );
};

export default Country;
