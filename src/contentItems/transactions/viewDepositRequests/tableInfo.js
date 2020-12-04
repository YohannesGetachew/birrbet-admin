import React from "react";
import { CustomIconButton } from "../../../components/buttons/iconButtons";
import { getDateConfig } from "../../../components/table/DefaultColumnConfigs";
import Tag from "../../../components/tag";

const getDepositRequestTableColumns = (theme, viewEvidence) => [
  {
    name: "transferSource",
    label: "Source",
  },
  {
    name: "confirmed",
    label: "Confirmed",
    options: {
      customBodyRender: (value) => {
        const colors = value
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
            label={value ? "YES" : "NO"}
            backgroundColor={colors.backgroundColor}
            textColor={colors.color}
          />
        );
      },
    },
  },
  {
    name: "updatedAt",
    label: "Date",
    ...getDateConfig(),
  },
  {
    name: "transactionId",
    label: "Transaction id",
    options: {
      customBodyRender: (value) => (value ? "Not confirmed" : value),
    },
  },
  {
    name: "evidenceType",
    label: "Evidence type",
  },
  {
    name: "evidence",
    label: "Evidence",
    options: {
      customBodyRender: (value, tableMeta) => {
        const evidenceType = tableMeta.rowData[4];
        return (
          <CustomIconButton
            type="view"
            handleClick={() => viewEvidence(value, evidenceType)}
          />
        );
      },
    },
  },
];

export default getDepositRequestTableColumns;
