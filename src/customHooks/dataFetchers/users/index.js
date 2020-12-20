import { useQuery } from "@apollo/client";
import { USERS, GET_USER } from "../../../graphql/user";
import { AuthContext } from "../../../contexts/auth";
import { useContext } from "react";
import { useGetShops } from "..";

const useGetUsers = (options = {}) => {
  const { loading, data, error } = useQuery(USERS, options);
  //
  const { authData } = useContext(AuthContext);
  const currentRole = authData.userData.role;
  const {
    data: shopData,
    loading: loadingShops,
    error: errorLoadingShops,
  } = useGetShops({ skip: currentRole === "SUPER_ADMIN" });
  if (currentRole === "ADMIN") {
    const adminId = authData.userData._id;
    if (shopData) {
      // assuming every admin will have a shop
      const currentAdminShop = shopData.shops.find(
        (shop) => shop.admin._id === adminId
      );
      console.log(adminId, " ", shopData.shops);
      if (data) {
        const users = data.users.filter((user) => {
          const isUserCustomer = user.role === "CUSTOMER";
          const isUserCashier = user.role === "CASHIER";
          const doesCashierBelongToAdmin = currentAdminShop
            ? isUserCashier && user.belongsToShop === currentAdminShop._id
            : false;
          return isUserCustomer || doesCashierBelongToAdmin;
        });
        return {
          loading: loading || loadingShops,
          error: error || errorLoadingShops,
          data: { users: users },
        };
      }
    }
  }
  if (currentRole === "CASHIER") {
    if (data) {
      const users = data.users.filter((user) => user.role === "CUSTOMER");
      return { loading, data: { users: users }, error };
    }
  }
  //
  return { loading, data, error };
};

const useGetUser = (options = {}) => {
  const result = useQuery(GET_USER, options);
  return result;
};

export { useGetUsers, useGetUser };
