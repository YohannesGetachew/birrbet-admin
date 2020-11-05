import {
  convertFromUnix,
  TODAY_IN_MS,
  getDurationInMS,
} from "../../../utils/date";
const getTransactionAnylitics = (transactions) => {
  const weekInMs = getDurationInMS(7);
  let netIncome = 0;
  let netIncomeThisWeek = 0;
  const depositArray = [];
  const withdrawalArray = [];
  const dates = [];
  const sortedTransactions = transactions.slice().sort(sortByUnixDate);
  sortedTransactions.forEach((transaction) => {
    dates.push(transaction.createdAt);
    const dateDifference = TODAY_IN_MS - transaction.createdAt;
    const isCreatedThisWeek = dateDifference <= weekInMs;
    if (transaction.type === "DEPOSIT") {
      depositArray.push(transaction.amount);
      netIncome = netIncome + transaction.amount;
      if (isCreatedThisWeek)
        netIncomeThisWeek = netIncomeThisWeek + transaction.amount;
    } else {
      netIncome = netIncome - transaction.amount;
      withdrawalArray.push(transaction.amount);
      if (isCreatedThisWeek)
        netIncomeThisWeek = netIncomeThisWeek - transaction.amount;
    }
  });

  const chosenDates = [];
  if (dates.length > 0) {
    chosenDates.push(dates[0]);
    dates.length > 1 && chosenDates.push(dates[(dates.length / 2) | 0]);
    dates.length > 2 && chosenDates.push(dates[dates.length - 1]);
  }
  if (dates.length <= 0) {
    chosenDates.push(0);
  }
  const readableChosenDates = [];
  chosenDates.forEach((date) => {
    readableChosenDates.push(convertFromUnix(date));
  });

  const todayReadable = convertFromUnix(TODAY_IN_MS);
  !readableChosenDates.includes(todayReadable) &&
    readableChosenDates.push(todayReadable);

  return {
    transactionCard: {
      count: netIncome.toString(),
      comparisonStartData: "This week",
      fluctuation: netIncomeThisWeek.toString(),
      direction: netIncomeThisWeek >= 0 ? "increase" : "decrease",
    },
    transactionGraph: {
      date: readableChosenDates,
      deposit: depositArray,
      withdrawal: withdrawalArray,
    },
  };
};

export default getTransactionAnylitics;

const sortByUnixDate = (a, b) => {
  if (a.createdAt > b.createdAt) return 1;
  return -1;
};
