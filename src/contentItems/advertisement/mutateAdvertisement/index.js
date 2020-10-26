import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { AlertError } from "../../../components/errors";
import Loader from "../../../components/loader";
import { APP } from "../../../graphql/app";
import AdvertisementForm from "./advertisementForm";

const MutateAdvertisement = () => {
  const { id } = useParams();
  const mutationMode = id ? "EDIT" : "CREATE";
  const {
    data: appData,
    loading: loadingAppData,
    error: errorLoadingApp,
  } = useQuery(APP);
  if (loadingAppData) return <Loader />;
  if (errorLoadingApp) return <AlertError />;
  console.log(appData);
  return (
    <AdvertisementForm
      mutationMode={mutationMode}
      ads={appData.app.advertisements}
      adToEditId={id}
      appId={appData.app._id}
    />
  );
};

export default MutateAdvertisement;
