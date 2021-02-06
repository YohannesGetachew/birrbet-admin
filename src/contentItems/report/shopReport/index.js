// tickets
// - placed tickets by some shop
// - winners count of some shop placed tickets
// - losers count of some placed tickets shop
// - all time won by users in some shop
// - all time system won in some shop

import { getDateConfig } from "../../../components/table/DefaultColumnConfigs";

// transactions
// - daily made transa
export const shopTicketsSummary = [
  {
    name: "branchName",
    label: "Branch name",
  },
  {
    name: "noOfPlaced",
    label: "no of played",
  },
  {
    name: "beforeVat",
    label: "before vat /tot/",
  },
  {
    name: "vat",
    label: "vat/tot/",
  },
  {
    name: "totalStake",
    label: "Total sales",
  },
];

export const winnerReportSummary = [
  {
    name: "updatedAt",
    label: "Date",
    ...getDateConfig(true, (value, tableMeta) => {
      return value;
    }),
  },
  {
    name: "placementID",
    label: "Reference no /Coupon no/",
  },
  {
    name: "placementID",
    label: "Invoice no /Payment Receipt Number/",
  },
  {
    name: "grossWinAmount",
    label: "Gross win amount",
  },
  {
    name: "incomeTax",
    label: "15% Income tax /Win tax/",
  },
  {
    name: "netPayment",
    label: "Net payment",
  },
];

export const transactionReportSummary = [
  {
    name: "shop.branchName",
    label: "Branch name",
  },
  {
    name: "deposit",
    label: "Deposit",
  },
  {
    name: "withdrawal",
    label: "Withdrawal",
  },
  {
    name: "net",
    label: "Net",
    options: {
      customBodyRender: (value, tableMeta) => {
        const deposit = tableMeta.rowData[1];
        const withdrawal = tableMeta.rowData[2];
        return (deposit - withdrawal).toFixed(2);
      },
    },
  },
];
