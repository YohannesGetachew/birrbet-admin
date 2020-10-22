import React from "react";
import UserForm from "./userForm";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { GET_USER } from "../../../graphql/user";
import Loader from "../../../components/loader";
import { AlertError } from "../../../components/errors";

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

  if (mutationMode === "CREATE") {
    return <UserForm mutationMode={mutationMode} history={history} />;
  }

  if (loadingUser) return <Loader />;
  if (errorLoadingUser) return <AlertError />;
  return (
    <UserForm
      mutationMode={mutationMode}
      userData={userData.user}
      history={history}
    />
  );
};

export default MutateUser;
