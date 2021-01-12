import { calculateTicketReturns } from "../../../utils/ticketCalculation";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import { convertFromUnix, convertToUnix } from "../../../utils/date";

const calculateTicketIncome = (ticket, app) => {
  switch (ticket.status) {
    case "WIN":
      return {
        userWon: calculateTicketReturns(
          ticket.stake,
          ticket.totalOdds,
          app.maxWin
        ).possibleWin,
        systemWon: 0,
      };
    case "LOSE":
      return { userWon: 0, systemWon: ticket.stake };
    case "PENDING":
      return { userWon: 0, systemWon: 0 };
    default:
      return { userWon: 0, systemWon: 0 };
  }
};

// const ticketUpdatedDate = +ticket.updatedAt;
//     const ticketPlacedDate = convertToUnix(ticket.placedDate);
//     const isTicketWinner = ticket.status === "WIN";

//     // daily report should include the date when certain tickets are resolved (update-date) and
//     // date when tickets are placed placed date
//     // sometimes update date and placed date may be equal

//     const ticketIncome = calculateTicketIncome(ticket, app);
//     allTimeUserWon = allTimeUserWon + ticketIncome.userWon;
//     allTimeSystemWon = allTimeSystemWon + ticketIncome.systemWon;

//     // if the ticket date doesnt exist create a report on that date
//     // else alter the report that contains that date

//     if (
//       getReportIndex(ticketUpdatedDate) < 0 ||
//       getReportIndex(ticketPlacedDate) < 0
//     ) {
//       if (getReportIndex(ticketUpdatedDate) < 0) {
//         console.log(
//           convertFromUnix(ticketPlacedDate) ===
//             convertFromUnix(ticketUpdatedDate)
//         );
//         dailyTicketReport.push({
//           date: ticketUpdatedDate, //
//           placedTicketCount:
//             convertFromUnix(ticketPlacedDate) ===
//             convertFromUnix(ticketUpdatedDate)
//               ? 1
//               : 0,
//           winnerCount: isTicketWinner ? 1 : 0,
//           netUserWon: ticketIncome.userWon,
//           netSystemWon: ticketIncome.systemWon,
//         });
//       }

//       // no ticket may be updated in the placed date
//       if (getReportIndex(ticketPlacedDate) < 0) {
//         dailyTicketReport.push({
//           date: ticketPlacedDate, //
//           placedTicketCount: 1,
//           winnerCount: isTicketWinner ? 1 : 0,
//           netUserWon: ticketIncome.userWon,
//           netSystemWon: ticketIncome.systemWon,
//         });
//       }
//     } else {
//       if (getReportIndex(ticketUpdatedDate) >= 0) {
//         const reportIndex = getReportIndex(ticketUpdatedDate);
//         dailyTicketReport[reportIndex].placedTicketCount =
//           dailyTicketReport[reportIndex].placedTicketCount + 1;
//         dailyTicketReport[reportIndex].winnerCount = isTicketWinner
//           ? dailyTicketReport[reportIndex].winnerCount + 1
//           : dailyTicketReport[reportIndex].winnerCount;
//         dailyTicketReport[reportIndex].netUserWon =
//           dailyTicketReport[reportIndex].netUserWon + ticketIncome.userWon;
//         dailyTicketReport[reportIndex].netSystemWon =
//           dailyTicketReport[reportIndex].netSystemWon + ticketIncome.systemWon;
//       }

//       if (
//         getReportIndex(ticketPlacedDate) >= 0 &&
//         getReportIndex(ticketPlacedDate) !== getReportIndex(ticketUpdatedDate)
//       ) {
//         const reportIndex = getReportIndex(ticketPlacedDate);
//         dailyTicketReport[reportIndex].placedTicketCount = ticket.isPlaced
//           ? dailyTicketReport[reportIndex].placedTicketCount + 1
//           : dailyTicketReport[reportIndex].placedTicketCount;
//         dailyTicketReport[reportIndex].winnerCount = isTicketWinner
//           ? dailyTicketReport[reportIndex].winnerCount + 1
//           : dailyTicketReport[reportIndex].winnerCount;
//         dailyTicketReport[reportIndex].netUserWon =
//           dailyTicketReport[reportIndex].netUserWon + ticketIncome.userWon;
//         dailyTicketReport[reportIndex].netSystemWon =
//           dailyTicketReport[reportIndex].netSystemWon + ticketIncome.systemWon;
//       }
//     }

// placed date signifies when the ticket was placed
// update date may signify when the ticket was created, placed or bets were updated
const getTicketReport = (tickets, app) => {
  const dailyTicketReport = [];
  let allTimeUserWon = 0;
  let allTimeSystemWon = 0;

  const getReportIndex = (date) =>
    dailyTicketReport.findIndex(
      (report) => convertFromUnix(report.date) === convertFromUnix(date)
    );

  tickets.forEach((ticket) => {
    const isTicketPlaced = ticket.isPlaced;
    if (!isTicketPlaced) return;

    const ticketUpdatedDate = +ticket.updatedAt;
    const ticketPlacedDate = convertToUnix(ticket.placedDate);
    const isTicketWinner = ticket.status === "WIN";

    const ticketIncome = calculateTicketIncome(ticket, app);
    allTimeUserWon = allTimeUserWon + ticketIncome.userWon;
    allTimeSystemWon = allTimeSystemWon + ticketIncome.systemWon;

    if (
      getReportIndex(ticketUpdatedDate) < 0 ||
      getReportIndex(ticketPlacedDate) < 0
    ) {
      if (getReportIndex(ticketUpdatedDate) < 0) {
        dailyTicketReport.push({
          date: ticketUpdatedDate, //
          placedTicketCount:
            convertFromUnix(ticketPlacedDate) ===
            convertFromUnix(ticketUpdatedDate)
              ? 1
              : 0,
          totalStake:
            convertFromUnix(ticketPlacedDate) ===
            convertFromUnix(ticketUpdatedDate)
              ? ticket.stake
              : 0,
          comission:
            convertFromUnix(ticketPlacedDate) ===
            convertFromUnix(ticketUpdatedDate)
              ? ticket.stake * 0.15
              : 0,
          winnerCount: isTicketWinner ? 1 : 0,
          //netUserWon: ticketIncome.userWon,
          //netSystemWon: ticketIncome.systemWon,
        });
      }

      // no ticket may be updated in the placed date
      if (getReportIndex(ticketPlacedDate) < 0) {
        dailyTicketReport.push({
          date: ticketPlacedDate, //
          placedTicketCount: 1,
          totalStake: ticket.stake,
          comission: ticket.stake * 0.15,
          winnerCount: isTicketWinner ? 1 : 0,
          // netUserWon: ticketIncome.userWon,
          //netSystemWon: ticketIncome.systemWon,
        });
      }
    } else {
      if (getReportIndex(ticketUpdatedDate) >= 0) {
        const reportIndex = getReportIndex(ticketUpdatedDate);
        dailyTicketReport[reportIndex].placedTicketCount =
          convertFromUnix(ticketPlacedDate) ===
          convertFromUnix(ticketUpdatedDate)
            ? dailyTicketReport[reportIndex].placedTicketCount + 1
            : dailyTicketReport[reportIndex].placedTicketCount;
        dailyTicketReport[reportIndex].winnerCount = isTicketWinner
          ? dailyTicketReport[reportIndex].winnerCount + 1
          : dailyTicketReport[reportIndex].winnerCount;
        dailyTicketReport[reportIndex].totalStake =
          convertFromUnix(ticketPlacedDate) ===
          convertFromUnix(ticketUpdatedDate)
            ? dailyTicketReport[reportIndex].totalStake + ticket.stake
            : dailyTicketReport[reportIndex].totalStake;
        dailyTicketReport[reportIndex].comission =
          convertFromUnix(ticketPlacedDate) ===
          convertFromUnix(ticketUpdatedDate)
            ? dailyTicketReport[reportIndex].comission + ticket.stake * 0.15
            : dailyTicketReport[reportIndex].comission;
        // dailyTicketReport[reportIndex].netUserWon =
        //   dailyTicketReport[reportIndex].netUserWon + ticketIncome.userWon;
        // dailyTicketReport[reportIndex].netSystemWon =
        //   dailyTicketReport[reportIndex].netSystemWon + ticketIncome.systemWon;
      }

      if (
        getReportIndex(ticketPlacedDate) >= 0 &&
        getReportIndex(ticketPlacedDate) !== getReportIndex(ticketUpdatedDate)
      ) {
        const reportIndex = getReportIndex(ticketPlacedDate);
        dailyTicketReport[reportIndex].placedTicketCount = ticket.isPlaced
          ? dailyTicketReport[reportIndex].placedTicketCount + 1
          : dailyTicketReport[reportIndex].placedTicketCount;
        dailyTicketReport[reportIndex].totalStake =
          dailyTicketReport[reportIndex].totalStake + ticket.stake;
        dailyTicketReport[reportIndex].comission =
          dailyTicketReport[reportIndex].comission + ticket.stake * 0.15;
        // dailyTicketReport[reportIndex].winnerCount
        // dailyTicketReport[reportIndex].netUserWon =
        //   dailyTicketReport[reportIndex].netUserWon + ticketIncome.userWon;
        // dailyTicketReport[reportIndex].netSystemWon =
        //   dailyTicketReport[reportIndex].netSystemWon + ticketIncome.systemWon;
      }
    }
  });

  return { dailyTicketReport, allTimeSystemWon, allTimeUserWon };
};

const getTicketsAndWinnersTableInfo = (tickets, app) => {
  const ticketsReportColumns = [
    {
      name: "date",
      label: "Date",
      ...getDateConfig(true, (value, tableMeta) => {
        return value;
      }),
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
      name: "totalStake",
      label: "Total stake",
      options: {
        ...getCustomFilterListOptions("Total stake"),
      },
    },
    {
      name: "comission",
      label: "Comission(15%)",
      options: {
        ...getCustomFilterListOptions("Comission(15%)"),
      },
    },
    // {
    //   name: "netUserWon",
    //   label: "Net user won",
    //   options: {
    //     ...getCustomFilterListOptions("Net user won"),
    //     customBodyRender: (value) => value.toFixed(2),
    //   },
    // },
    // {
    //   name: "netSystemWon",
    //   label: "Net system won",
    //   options: {
    //     ...getCustomFilterListOptions("Net system won"),
    //     customBodyRender: (value) => value.toFixed(2),
    //   },
    // },
  ];
  const ticketReport = getTicketReport(tickets, app);

  return {
    data: ticketReport.dailyTicketReport.map((report) => ({
      ...report,
      date: convertFromUnix(report.date),
    })),
    columns: ticketsReportColumns,
    allTimeUserWon: ticketReport.allTimeUserWon.toFixed(2),
    allTimeSystemWon: ticketReport.allTimeSystemWon.toFixed(2),
  };
};

export default getTicketsAndWinnersTableInfo;
