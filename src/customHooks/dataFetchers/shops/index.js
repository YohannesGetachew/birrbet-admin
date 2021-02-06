import { useQuery } from "@apollo/client";
import { SHOPS } from "../../../graphql/shop";

const useGetShops = (options = {}) => {
  const result = useQuery(SHOPS, options);
  return result;
};
export default useGetShops;

export const useGetAdminsShop = (adminId, skip) => {
  const { data, error, loading } = useGetShops({ skip });
  let adminsShop = null;
  if (data) {
    adminsShop = data.shops.find((shop) => shop.admin._id === adminId);
  }
  return { adminsShop, error: error || adminsShop === undefined, loading };
};

const debreMarkos = {
  _id: "5ff311d3741a3875db845b59",
  branchName: "Debre Markos",
  isActive: true,
  admin: {
    _id: "5ff310fa741a3875db845b58",
    firstName: "Yohanes",
    lastName: "Dagnachew",
    username: "0912060908",
  },
  contacts: [
    {
      type: "PHONE",
      value: "0912060908",
    },
  ],
  location: {
    lat: 9.0064478,
    lon: 38.7890143,
  },
};

export const sortShopsByTickets = (tickets) => {
  const onlineShop = {
    _id: "online",
    branchName: "Online",
  };
  const shopsToTicketsMap = [];
  tickets.forEach((ticket) => {
    const { placerType } = ticket;
    if (placerType !== "CASHIER" && placerType !== "CUSTOMER") return;
    if (placerType === "CUSTOMER") {
      const onlineShopIndex = shopsToTicketsMap.findIndex(
        (shopToTicketMap) => shopToTicketMap.shop._id === "online"
      );

      onlineShopIndex < 0
        ? shopsToTicketsMap.push({
            shop: onlineShop,
            tickets: [ticket],
          })
        : shopsToTicketsMap[onlineShopIndex].tickets.push(ticket);
      return;
    }
    const shopIndex = shopsToTicketsMap.findIndex(
      (shopToTicketMap) =>
        shopToTicketMap.shop._id === ticket.user.belongsToShop
    );
    if (shopIndex < 0) {
      shopsToTicketsMap.push({ shop: ticket.shop, tickets: [ticket] });
    } else {
      shopsToTicketsMap[shopIndex].tickets.push(ticket);
    }
  });
  return shopsToTicketsMap;
};
