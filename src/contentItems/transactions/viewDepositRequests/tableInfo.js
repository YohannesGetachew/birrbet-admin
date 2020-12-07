import { Button } from "@material-ui/core";
import React from "react";
import { CustomIconButton } from "../../../components/buttons/iconButtons";
import { getDateConfig } from "../../../components/table/DefaultColumnConfigs";
import Tag from "../../../components/tag";

const getDepositRequestTableColumns = (
  theme,
  viewEvidence,
  handleActionButtonClick
) => [
  {
    name: "customer.username",
    label: "Customer",
    options: {
      customBodyRender: (username, tableMeta) => {
        const firstName = tableMeta.rowData[1];
        const lastName = tableMeta.rowData[2];
        return (
          <div>
            <div>
              <b>{firstName + " " + lastName}</b>
            </div>
            <div>
              <small>{username}</small>
            </div>
          </div>
        );
      },
    },
  },
  {
    name: "customer.firstName",
    options: {
      display: false,
      filter: false,
    },
  },
  {
    name: "customer.lastName",
    options: {
      display: false,
      filter: false,
    },
  },
  {
    name: "transferSource",
    label: "Source",
  },
  {
    name: "denied",
    options: {
      display: false,
      filter: false,
    },
  },
  {
    name: "confirmed",
    label: "Status",
    options: {
      customBodyRender: (confirmed, tableMeta) => {
        const denied = tableMeta.rowData[4];
        let tagInfo;
        if (confirmed)
          tagInfo = {
            backgroundColor: theme.palette.success.light,
            textColor: theme.palette.success.dark,
            label: "CONFIRMED",
          };
        if (denied)
          tagInfo = {
            backgroundColor: theme.palette.error.light,
            textColor: theme.palette.error.dark,
            label: "DENIED",
          };
        if (!confirmed && !denied) {
          tagInfo = {
            backgroundColor: theme.palette.warning.light,
            textColor: theme.palette.warning.dark,
            label: "PENDING",
          };
        }

        return (
          <Tag
            label={tagInfo.label}
            backgroundColor={tagInfo.backgroundColor}
            textColor={tagInfo.textColor}
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
    options: {
      customBodyRender: (value) =>
        value === "TRANSACTION_ID" ? "ID" : "PICTURE",
    },
  },
  {
    name: "evidence",
    label: "Evidence",
    options: {
      customBodyRender: (value, tableMeta) => {
        const evidenceType = tableMeta.rowData[8];
        return (
          <CustomIconButton
            type="view"
            handleClick={() => viewEvidence(value, evidenceType)}
          />
        );
      },
    },
  },
  {
    name: "_id",
    label: "Actions",
    options: {
      sort: false,
      customBodyRender: (id, tableMeta) => {
        const denied = tableMeta.rowData[4];
        const confirmed = tableMeta.rowData[5];
        const disabled = confirmed || denied;
        const username = tableMeta.rowData[0];
        const firstName = tableMeta.rowData[1];
        const lastName = tableMeta.rowData[2];
        const fullName = `${firstName} ${lastName} (${username})`;
        // if (confirmed || denied) {
        //   return (
        //     <CustomIconButton
        //       type="delete"
        //       handleClick={() => handleActionButtonClick("DELETE", id)}
        //     />
        //   );
        // }
        return (
          <>
            {!denied && (
              <Button
                variant="contained"
                size="small"
                disabled={disabled}
                onClick={() => handleActionButtonClick("CONFIRM", id, fullName)}
                style={{
                  backgroundColor: !disabled
                    ? theme.palette.warning.main
                    : theme.palette.secondary.light,
                  color: theme.palette.primary.light,
                  margin: "4px",
                }}
              >
                {confirmed ? "Confirmed" : "Confirm"}
              </Button>
            )}
            {!confirmed && (
              <Button
                variant="contained"
                size="small"
                disabled={confirmed || denied}
                onClick={() => handleActionButtonClick("DENY", id, fullName)}
                style={{
                  backgroundColor: !disabled
                    ? theme.palette.warning.main
                    : theme.palette.secondary.light,
                  color: theme.palette.primary.light,
                  margin: "4px",
                }}
              >
                {denied ? "Denied" : "Deny"}
              </Button>
            )}
          </>
        );
      },
    },
  },
];

export default getDepositRequestTableColumns;
