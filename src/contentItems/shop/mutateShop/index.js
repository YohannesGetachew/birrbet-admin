import { useQuery } from "@apollo/client";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { AlertError } from "../../../components/errors";
import Loader from "../../../components/loader";
import { GET_SHOP } from "../../../graphql/shop";
import { USERS } from "../../../graphql/user";
import ShopForm from "./shopForm";

const MutateShop = () => {
  const { id } = useParams();
  const mutationMode = id ? "EDIT" : "CREATE";
  const {
    data: adminData,
    loading: areAdminsLoading,
    error: adminFailed,
  } = useQuery(USERS, { variables: { role: "ADMIN" } });
  const { data: shopData, loading: shopLoading, error: shopFailed } = useQuery(
    GET_SHOP,
    {
      variables: { id },
      skip: mutationMode === "CREATE",
    }
  );

  if (areAdminsLoading || shopLoading) return <Loader />;
  if (adminFailed || shopFailed) return <AlertError />;

  return (
    <ShopForm
      shop={shopData?.shop}
      admins={adminData.users}
      mutationMode={mutationMode}
    />
  );
};

export default MutateShop;
