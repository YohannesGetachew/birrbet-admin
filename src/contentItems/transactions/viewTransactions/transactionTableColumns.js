import React from "react";
import Tag from "../../../components/tag";

const getTransactionTableColumns = (theme) => [
  {
    name: "customer",
    label: "Customer",
  },
  {
    name: "cashier",
    label: "Cashier",
  },
  {
    name: "transactionType",
    label: "Transaction type",
    options: {
      customBodyRender: (value) => {
        const colors =
          value === "DEPOSIT"
            ? {
                backgroundColor: theme.palette.success.light,
                color: theme.palette.success.dark,
              }
            : {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.dark,
              };
        return (
          <Tag
            label={value}
            backgroundColor={colors.backgroundColor}
            textColor={colors.color}
          />
        );
      },
    },
  },
  {
    name: "amount",
    label: "Amount",
  },
  {
    name: "balanceAfterTransaction",
    label: "Balance after",
  },
  {
    name: "date",
    label: "Date",
  },
];

export default getTransactionTableColumns;
