import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { MARKETS, UPDATE_MARKETS } from "../../graphql/market";
import { useTheme } from "@material-ui/core";
import Loader from "../../components/loader";
import { AlertError } from "../../components/errors";
import Table from "../../components/table";
import getMarketColumns from "./marketTableColumns";

const handleSportUpdate = async (id, isAvailable, mutate) => {
  try {
    await mutate({
      variables: { id, updateInput: { isAvailable: !isAvailable } },
    });
  } catch (err) {
    return;
  }
};

const Market = () => {
  const {
    data: marketData,
    loading: loadingMarkets,
    error: errorLoadingMarkets,
  } = useQuery(MARKETS);
  const [
    updateMarket,
    { loading: isUpdatingMarket, error: errorUpdatingMarket },
  ] = useMutation(UPDATE_MARKETS);
  const theme = useTheme();
  if (loadingMarkets) return <Loader />;
  if (errorLoadingMarkets) return <AlertError />;
  return (
    <>
      {errorUpdatingMarket && <AlertError />}
      <Table
        columns={getMarketColumns(
          theme,
          updateMarket,
          handleSportUpdate,
          isUpdatingMarket
        )}
        data={marketData?.markets}
      />
    </>
  );
};

export default Market;
