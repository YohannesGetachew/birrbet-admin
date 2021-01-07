import { useQuery } from "@apollo/client";
import { USERS, GET_USER } from "../../../graphql/user";
import { AuthContext } from "../../../contexts/auth";
import { useContext } from "react";
import { useGetAdminsShop } from "../shops";

const useGetUsers = (options = {}) => {
  const { loading, data, error } = useQuery(USERS, options);
  const { authData } = useContext(AuthContext);
  const currentRole = authData.userData.role;
  const {
    adminsShop,
    loading: loadingShops,
    error: errorLoadingShops,
  } = useGetAdminsShop(authData.userData._id, currentRole !== "ADMIN");
  let users;
  if (currentRole === "ADMIN") {
    // assuming every admin will have a shop
    if (data) {
      if (adminsShop) {
        users = data.users.filter((user) => {
          const isUserCustomer = user.role === "CUSTOMER";
          const isUserCashier = user.role === "CASHIER";
          const doesCashierBelongToAdmin = adminsShop
            ? isUserCashier && user.belongsToShop === adminsShop._id
            : false;
          return isUserCustomer || doesCashierBelongToAdmin;
        });
      }
    }
  }
  if (currentRole === "CASHIER") {
    if (data) {
      users = data.users.filter((user) => user.role === "CUSTOMER");
      return { loading, data: { users: users }, error };
    }
  }
  if (currentRole === "SUPER_ADMIN" && data) users = data.users;
  //
  return {
    loading: loading || loadingShops,
    data: { users },
    error: errorLoadingShops,
  };
};

const useGetUser = (options = {}) => {
  const result = useQuery(GET_USER, options);
  return result;
};

export { useGetUsers, useGetUser };
