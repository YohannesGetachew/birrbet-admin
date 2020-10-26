import { convertFromUnix } from "../../../utils/date";

const getTicketsAndWinnersTableInfo = (tickets) => {
  const ticketsReportData = [];
  tickets.forEach((ticket) => {
    const ticketCreatedDate = convertFromUnix(ticket.createdAt);
    const isTicketWinner = ticket.status === "WIN";
    const dateIndex = ticketsReportData.findIndex(
      (report) => report.date === ticketCreatedDate
    );
    if (dateIndex < 0) {
      ticketsReportData.push({
        date: ticketCreatedDate,
        ticketCount: 1,
        winnerCount: isTicketWinner ? 1 : 0,
      });
    } else {
      ticketsReportData[dateIndex].ticketCount =
        ticketsReportData[dateIndex].ticketCount + 1;
      ticketsReportData[dateIndex].winnerCount = isTicketWinner
        ? ticketsReportData[dateIndex].winnerCount + 1
        : ticketsReportData[dateIndex].winnerCount;
    }
  });
  const ticketsReportColumns = [
    {
      name: "date",
      label: "Date",
    },
    {
      name: "ticketCount",
      label: "Tickets",
    },
    {
      name: "winnerCount",
      label: "Winners",
    },
  ];
  return { data: ticketsReportData, columns: ticketsReportColumns };
};

export default getTicketsAndWinnersTableInfo;
