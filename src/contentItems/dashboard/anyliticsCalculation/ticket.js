const getTicketAnalysis = (tickets) => {
  const today = Math.round(new Date().getTime());
  const weekInMs = 604800000;
  let totalWinners = 0;
  let ticketsThisWeek = 0;
  let winnersThisWeek = 0;
  tickets.forEach((ticket) => {
    const dateDifference = today - ticket.createdAt;
    const isCreatedThisWeek = dateDifference <= weekInMs;
    if (isCreatedThisWeek) ticketsThisWeek += 1;
    if (ticket.status === "WIN") {
      totalWinners += 1;
      if (isCreatedThisWeek) {
        winnersThisWeek += 1;
      }
    }
  });
  return {
    tickets: {
      count: tickets.length.toString(),
      comparisonStartData: "This week",
      fluctuation: ticketsThisWeek.toString(),
      direction: "increase",
    },
    winners: {
      count: totalWinners.toString(),
      comparisonStartData: "This week",
      fluctuation: winnersThisWeek.toString(),
      direction: "increase",
    },
  };
};

// return {
//     count: netIncome.toString(),
//     comparisonStartData: "This week",
//     fluctuation: netIncomeThisWeek.toString(),
//     direction: netIncomeThisWeek >= 0 ? "increase" : "decrease",
//   };

export default getTicketAnalysis;
