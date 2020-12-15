import React from "react";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import {
  convertFromUnix,
  convertToUnix,
  getFormattedDate,
} from "../../../utils/date";

const cashiersTableColumns = [
  {
    name: "date",
    label: "Date",
    ...getDateConfig(),
  },
  {
    name: "placedTicketsCount",
    label: "Placed tickets",
    options: {
      ...getCustomFilterListOptions("Placed tickets"),
    },
  },
  {
    name: "totalStake",
    label: "Total stake",
    options: {
      ...getCustomFilterListOptions("Total stake"),
    },
  },
];

const getCashiersReportData = (cashier, tickets) => {
  const cashierReportData = [];
  const cashierPlacedTickets = tickets.filter(
    (ticket) => ticket.userID === cashier._id
  );
  cashierPlacedTickets.forEach((ticket) => {
    if (!ticket.isPlaced || ticket.placerType === "CUSTOMER") return;
    const placedDate = convertToUnix(ticket.placedDate);
    const reportIndex = cashierReportData.findIndex(
      (report) => convertFromUnix(report.date) === convertFromUnix(placedDate)
    );
    if (reportIndex < 0) {
      cashierReportData.push({
        totalStake: ticket.stake,
        placedTicketsCount: 1,
        date: placedDate,
      });
    } else {
      cashierReportData[reportIndex].placedTicketsCount =
        cashierReportData[reportIndex].placedTicketsCount + 1;
      cashierReportData[reportIndex].totalStake =
        cashierReportData[reportIndex].totalStake + ticket.stake;
    }
  });
  return cashierReportData;
};

const getCashiersReportDataAndColumns = (cashier, tickets) => {
  return {
    data: getCashiersReportData(cashier, tickets),
    columns: cashiersTableColumns,
  };
};

export default getCashiersReportDataAndColumns;
