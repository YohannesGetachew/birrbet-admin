import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SPORTS, UPDATE_SPORT } from "../../graphql/sport";
import Loader from "../../components/loader";
import { AlertError } from "../../components/errors";
import Table from "../../components/table";
import { useTheme } from "@material-ui/core";
import getSportTableColumns from "./sportTableColumns";

const handleSportUpdate = async (id, isAvailable, mutate) => {
  try {
    await mutate({
      variables: { id, updateInput: { isAvailable: !isAvailable } },
    });
  } catch (err) {
    return;
  }
};

const Sport = () => {
  const {
    data: sportData,
    loading: loadingSports,
    error: errorLoadingSports,
  } = useQuery(SPORTS);
  const [
    updateSports,
    { data, loading: isUpdatingSports, error: errorUpdatingSport },
  ] = useMutation(UPDATE_SPORT);
  const theme = useTheme();
  if (loadingSports) return <Loader />;
  if (errorLoadingSports) return <AlertError />;

  return (
    <>
      {errorUpdatingSport && <AlertError />}
      <Table
        columns={getSportTableColumns(
          theme,
          updateSports,
          handleSportUpdate,
          isUpdatingSports
        )}
        data={sportData.sports}
      />
    </>
  );
};

export default Sport;
