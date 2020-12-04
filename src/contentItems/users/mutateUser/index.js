import React from "react";
import UserForm from "./userForm";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { GET_USER } from "../../../graphql/user";
import Loader from "../../../components/loader";
import { AlertError } from "../../../components/errors";
import { SHOPS } from "../../../graphql/shop";

const MutateUser = () => {
  const { id } = useParams();
  const history = useHistory();
  const mutationMode = id ? "EDIT" : "CREATE";
  const {
    loading: loadingUser,
    data: userData,
    error: errorLoadingUser,
  } = useQuery(GET_USER, {
    variables: { id },
    skip: mutationMode === "CREATE",
  });

  const {
    loading: loadingShop,
    data: shopData,
    error: errorLoadingShop,
  } = useQuery(SHOPS);

  if (loadingUser || loadingShop) return <Loader />;
  if (errorLoadingUser || errorLoadingShop) return <AlertError />;

  if (mutationMode === "CREATE") {
    return (
      <UserForm
        mutationMode={mutationMode}
        history={history}
        shops={shopData.shops}
      />
    );
  }

  return (
    <UserForm
      mutationMode={mutationMode}
      userData={userData.user}
      shops={shopData.shops}
      history={history}
    />
  );
};

export default MutateUser;
