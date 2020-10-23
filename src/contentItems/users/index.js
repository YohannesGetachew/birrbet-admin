import React from "react";
import { useQuery } from "@apollo/client";
import { USERS } from "../../graphql/user";
import Loader from "../../components/loader";
import { AlertError } from "../../components/errors";
import ViewUsers from "./viewUsers";
import { Button } from "@material-ui/core";
import usersStyle from "./style";
import { useHistory } from "react-router-dom";

const User = () => {
  const style = usersStyle();
  const history = useHistory();
  const {
    loading: loadingUsers,
    error: errorFetchingUsers,
    data: users,
  } = useQuery(USERS, { fetchPolicy: "network-only" });
  if (loadingUsers) return <Loader />;
  if (errorFetchingUsers) return <AlertError />;
  return (
    <div className={style.root}>
      <Button
        onClick={() => history.push("/admin/users/create")}
        variant="contained"
        size="small"
        className={style.addBtn}
      >
        + Add user
      </Button>
      <ViewUsers users={users.users} />
    </div>
  );
};

export default User;
