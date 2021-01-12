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

export const sortShopsByTickets = (tickets) => {
  const shopsToTicketsMap = [];
  tickets.forEach((ticket) => {
    const { placerType } = ticket;
    if (placerType !== "CASHIER" && placerType !== "CUSTOMER") return;
    if (placerType === "CUSTOMER") {
      const onlineShopIndex = shopsToTicketsMap.findIndex(
        (shopToTicketMap) => shopToTicketMap.shop._id === "online"
      );

      const onlineShop = {
        _id: "online",
        branchName: "Online",
      };

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
