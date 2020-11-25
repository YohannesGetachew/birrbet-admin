import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import { convertFromUnix } from "../../../utils/date";

const getTransactionsReportTableInfo = (transactions, theme) => {
  const transactionsReportData = [];
  transactions.forEach((transaction) => {
    const transactionCreatedDate = convertFromUnix(transaction.createdAt);
    const transactionType = transaction.type;
    const dateIndex = transactionsReportData.findIndex(
      (report) => convertFromUnix(report.date) === transactionCreatedDate
    );
    if (dateIndex < 0) {
      transactionsReportData.push({
        date: transaction.createdAt,
        deposit: transactionType === "DEPOSIT" ? transaction.amount : 0,
        withdrawal: transactionType === "WITHDRAW" ? 1 : 0,
        net:
          transactionType === "DEPOSIT"
            ? transaction.amount
            : -transaction.amount,
      });
    } else {
      if (transactionType === "DEPOSIT") {
        transactionsReportData[dateIndex].deposit =
          transactionsReportData[dateIndex].deposit + transaction.amount;
        transactionsReportData[dateIndex].net =
          transactionsReportData[dateIndex].net + transaction.amount;
      }
      if (transactionType === "WITHDRAW") {
        transactionsReportData[dateIndex].withdrawal =
          transactionsReportData[dateIndex].withdrawal + transaction.amount;
        transactionsReportData[dateIndex].net =
          transactionsReportData[dateIndex].net - transaction.amount;
      }
    }
  });
  const transactionsReportColumns = [
    {
      name: "date",
      label: "Date",
      ...getDateConfig(),
    },
    {
      name: "deposit",
      label: "Deposit",
      options: {
        ...getCustomFilterListOptions("Deposit"),
      },
    },
    {
      name: "withdrawal",
      label: "Withdrawal",
      options: {
        ...getCustomFilterListOptions("Withdrawal"),
      },
    },
    {
      name: "net",
      label: "Net",
      options: {
        ...getCustomFilterListOptions("Net"),
      },
    },
  ];
  return { data: transactionsReportData, columns: transactionsReportColumns };
};

export default getTransactionsReportTableInfo;
