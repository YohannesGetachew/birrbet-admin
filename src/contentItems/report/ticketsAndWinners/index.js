import {} from "../../../components/fields/muiDatatableFilters";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import { convertFromUnix } from "../../../utils/date";

const getTicketsAndWinnersTableInfo = (tickets) => {
  const ticketsReportData = [];
  tickets.forEach((ticket) => {
    console.log(ticket);
    const ticketUpdatedDate = convertFromUnix(ticket.updatedAt);
    const isTicketWinner = ticket.status === "WIN";
    const dateIndex = ticketsReportData.findIndex(
      (report) => report.date === ticketUpdatedDate
    );
    if (dateIndex < 0) {
      ticketsReportData.push({
        date: ticket.updatedAt,
        placedTicketCount: ticket.isPlaced ? 1 : 0,
        winnerCount: isTicketWinner ? 1 : 0,
      });
    } else {
      ticketsReportData[dateIndex].placedTicketCount = ticket.isPlaced
        ? ticketsReportData[dateIndex].placedTicketCount + 1
        : ticketsReportData[dateIndex].placedTicketCount;
      ticketsReportData[dateIndex].winnerCount = isTicketWinner
        ? ticketsReportData[dateIndex].winnerCount + 1
        : ticketsReportData[dateIndex].winnerCount;
    }
  });

  const ticketsReportColumns = [
    {
      name: "date",
      label: "Date",
      ...getDateConfig(),
    },
    {
      name: "placedTicketCount",
      label: "Placed tickets",
      options: {
        ...getCustomFilterListOptions("Placed tickets"),
      },
    },
    {
      name: "winnerCount",
      label: "Winners",
      options: {
        ...getCustomFilterListOptions("Winners"),
      },
    },
  ];
  return { data: ticketsReportData, columns: ticketsReportColumns };
};

export default getTicketsAndWinnersTableInfo;
