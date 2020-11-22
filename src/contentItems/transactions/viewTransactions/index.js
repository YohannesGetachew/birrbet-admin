import React from "react";
import Table from "../../../components/table";
import { convertFromUnix } from "../../../utils/date";
import getTransactionTableColumns from "./transactionTableColumns";
import { useTheme } from "@material-ui/core";

const ViewTransactions = ({ transactions }) => {
  console.log(transactions);
  const reorganizedTransactions = transactions.map((transaction) => {
    return {
      customer: transaction.customer.username,
      cashier: transaction.cashier.username,
      transactionType: transaction.type,
      amount: transaction.amount,
      date: convertFromUnix(transaction.createdAt),
      accountBalance: transaction.customer.accountBalance.toFixed(2),
    };
  });
  const theme = useTheme();
  const columns = getTransactionTableColumns(theme);
  return <Table columns={columns} data={reorganizedTransactions} />;
};

export default ViewTransactions;
