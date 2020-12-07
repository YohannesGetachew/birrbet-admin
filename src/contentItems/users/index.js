import React from "react";
import Loader from "../../components/loader";
import { AlertError } from "../../components/errors";
import ViewUsers from "./viewUsers";
import usersStyle from "./style";
import { useGetUsers } from "../../customHooks/dataFetchers";
import { AddButton } from "../../components/buttons";
import { useGetCurrentUserRole } from "../../customHooks/helpers";

const User = () => {
  const currentUserRole = useGetCurrentUserRole();
  const style = usersStyle();
  const {
    loading: loadingUsers,
    error: errorFetchingUsers,
    data: users,
  } = useGetUsers();
  if (loadingUsers) return <Loader />;
  if (errorFetchingUsers) return <AlertError />;
  return (
    <div className={style.root}>
      <AddButton
        label="+ Add User"
        redirectRoute="/admin/users/create"
        dontRender={currentUserRole === "CASHIER"}
      />
      <ViewUsers users={users.users} />
    </div>
  );
};

export default User;
