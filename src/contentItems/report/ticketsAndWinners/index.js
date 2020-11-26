import { calculateTicketReturns } from "../../../utils/ticketCalculation";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import { convertFromUnix } from "../../../utils/date";

const getTicketsAndWinnersTableInfo = (tickets, app) => {
  const ticketsReportData = [];
  let allTimeUserWon = 0;
  let allTimeSystemWon = 0;
  tickets.forEach((ticket) => {
    const ticketUpdatedDate = ticket.updatedAt;
    const isTicketWinner = ticket.status === "WIN";
    const isTicketLoser = ticket.status === "LOSE";
    const isTicketPending = ticket.status === "PENDING";
    const calculateTicketIncome = () => {
      if (isTicketPending) return { userWon: 0, systemWon: 0 };
      if (isTicketWinner)
        return {
          userWon: parseFloat(
            calculateTicketReturns(ticket.stake, ticket.totalOdds, app.maxWin)
              .possibleWin
          ),
          systemWon: 0,
        };
      if (isTicketLoser) return { userWon: 0, systemWon: ticket.stake };
    };
    const dateIndex = ticketsReportData.findIndex(
      (report) =>
        convertFromUnix(report.date) === convertFromUnix(ticketUpdatedDate)
    );
    const ticketIncome = calculateTicketIncome();
    allTimeUserWon = allTimeUserWon + ticketIncome.userWon;
    allTimeSystemWon = allTimeSystemWon + ticketIncome.systemWon;
    if (dateIndex < 0) {
      ticketsReportData.push({
        date: ticketUpdatedDate,
        placedTicketCount: ticket.isPlaced ? 1 : 0,
        winnerCount: isTicketWinner ? 1 : 0,
        netUserWon: ticketIncome.userWon,
        netSystemWon: ticketIncome.systemWon,
      });
    } else {
      ticketsReportData[dateIndex].placedTicketCount = ticket.isPlaced
        ? ticketsReportData[dateIndex].placedTicketCount + 1
        : ticketsReportData[dateIndex].placedTicketCount;
      ticketsReportData[dateIndex].winnerCount = isTicketWinner
        ? ticketsReportData[dateIndex].winnerCount + 1
        : ticketsReportData[dateIndex].winnerCount;
      ticketsReportData[dateIndex].netUserWon =
        ticketsReportData[dateIndex].netUserWon + ticketIncome.userWon;
      ticketsReportData[dateIndex].netSystemWon =
        ticketsReportData[dateIndex].netSystemWon + ticketIncome.systemWon;
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
      name: "netUserWon",
      label: "Net user won",
      options: {
        ...getCustomFilterListOptions("Net user won"),
        customBodyRender: (value) => value.toFixed(2),
      },
    },
    {
      name: "netSystemWon",
      label: "Net system won",
      options: {
        ...getCustomFilterListOptions("Net system won"),
        customBodyRender: (value) => value.toFixed(2),
      },
    },
  ];
  return {
    data: ticketsReportData,
    columns: ticketsReportColumns,
    allTimeUserWon: allTimeUserWon.toFixed(2),
    allTimeSystemWon: allTimeSystemWon.toFixed(2),
  };
};

export default getTicketsAndWinnersTableInfo;
