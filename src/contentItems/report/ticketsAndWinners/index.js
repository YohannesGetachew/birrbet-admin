import { calculateTicketReturns } from "../../../utils/ticketCalculation";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import { convertFromUnix } from "../../../utils/date";

const getTicketsAndWinnersTableInfo = (tickets, app) => {
  const ticketsReportData = [];
  let allTimeTicketIncome = 0;
  let maximumPossibleLoss = 0;
  tickets.forEach((ticket) => {
    const ticketUpdatedDate = ticket.updatedAt;
    const isTicketWinner = ticket.status === "WIN";
    const isTicketLoser = ticket.status === "LOSE";
    const isTicketPending = ticket.status === "PENDING";
    const calculateTicketIncome = () => {
      if (isTicketPending) return 0;
      if (isTicketWinner)
        return parseFloat(
          calculateTicketReturns(ticket.stake, ticket.totalOdds, app.maxWin)
            .possibleWin
        );
      if (isTicketLoser) return -ticket.stake;
    };
    const dateIndex = ticketsReportData.findIndex(
      (report) =>
        convertFromUnix(report.date) === convertFromUnix(ticketUpdatedDate)
    );
    const ticketIncome = calculateTicketIncome();
    allTimeTicketIncome = allTimeTicketIncome + ticketIncome;
    if (dateIndex < 0) {
      ticketsReportData.push({
        date: ticketUpdatedDate,
        placedTicketCount: ticket.isPlaced ? 1 : 0,
        winnerCount: isTicketWinner ? 1 : 0,
        net: ticketIncome,
      });
    } else {
      ticketsReportData[dateIndex].placedTicketCount = ticket.isPlaced
        ? ticketsReportData[dateIndex].placedTicketCount + 1
        : ticketsReportData[dateIndex].placedTicketCount;
      ticketsReportData[dateIndex].winnerCount = isTicketWinner
        ? ticketsReportData[dateIndex].winnerCount + 1
        : ticketsReportData[dateIndex].winnerCount;
      ticketsReportData[dateIndex].net =
        ticketsReportData[dateIndex].net + ticketIncome;
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
    {
      name: "net",
      label: "Net user won",
    },
  ];
  return {
    data: ticketsReportData,
    columns: ticketsReportColumns,
    allTimeTicketIncome,
  };
};

export default getTicketsAndWinnersTableInfo;
