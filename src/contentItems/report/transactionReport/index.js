import React from "react";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../components/table/DefaultColumnConfigs";
import Tag from "../../../components/tag";
import { convertFromUnix } from "../../../utils/date";

const getTransactionsReportTableInfo = (transactions, theme) => {
  const transactionsReportData = [];
  transactions.forEach((transaction) => {
    const transactionCreatedDate = convertFromUnix(transaction.createdAt);
    const transactionType = transaction.type;
    const dateIndex = transactionsReportData.findIndex(
      (report) => report.date === transactionCreatedDate
    );
    if (dateIndex < 0) {
      transactionsReportData.push({
        date: transaction.createdAt,
        depositCount: transactionType === "DEPOSIT" ? 1 : 0,
        withdrawalCount: transactionType === "WITHDRAW" ? 1 : 0,
      });
    } else {
      if (transactionType === "DEPOSIT") {
        transactionsReportData[dateIndex].depositCount =
          transactionsReportData[dateIndex].depositCount + 1;
      }
      if (transactionType === "WITHDRAW") {
        transactionsReportData[dateIndex].withdrawalCount =
          transactionsReportData[dateIndex].withdrawalCount + 1;
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
      name: "depositCount",
      label: "Deposit count",
      options: {
        ...getCustomFilterListOptions("Deposit count"),
      },
    },
    {
      name: "withdrawalCount",
      label: "Withdrawal count",
      options: {
        ...getCustomFilterListOptions("Deposit count"),
      },
    },
  ];
  return { data: transactionsReportData, columns: transactionsReportColumns };
};

export default getTransactionsReportTableInfo;
