import React from "react";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../../../components/buttons/iconButtons";
import { convertFromUnix } from "../../../../utils/date";
import { Button } from "@material-ui/core";

const getTicketColumn = (theme, prepareTicketPlacement) => [
  {
    name: "ticketID",
    label: "Ticket code",
    options: {},
  },
  {
    name: "status",
    label: "Status",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const colors = {
          PENDING: theme.palette.warning.dark,
          LOSE: theme.palette.error.dark,
          WIN: theme.palette.success.dark,
        };
        return (
          <span
            style={{
              color: colors[value],
              border: `1px solid ${colors[value]}`,
              padding: "4px",
              fontSize: "11px",
            }}
          >
            {value}
          </span>
        );
      },
    },
  },
  {
    name: "updatedAt",
    label: "Date",
    options: {
      customBodyRender: (values) => {
        return convertFromUnix(values);
      },
    },
  },
  {
    name: "isPlaced",
    label: "Placed",
    options: {
      customBodyRender: (value, tableMeta, updateValue) =>
        value ? (
          <CheckRounded style={{ color: theme.palette.success.main }} />
        ) : (
          <ClearRounded style={{ color: theme.palette.error.main }} />
        ),
    },
  },
  {
    name: "_id",
    label: "Actions",
    options: {
      print: false,
      filter: false,
      sort: false,
      download: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <>
          <Button
            size="small"
            style={{
              backgroundColor: tableMeta.rowData[3]
                ? theme.palette.primary.light
                : theme.palette.accentTwo.dark,
              color: tableMeta.rowData[3]
                ? theme.palette.accentOne.light
                : theme.palette.primary.main,
              marginRight: "10px",
            }}
            disabled={tableMeta.rowData[3]}
            onClick={() => prepareTicketPlacement(value, "PLACE")}
          >
            {tableMeta.rowData[3] ? "Placed" : "Place"}
          </Button>
          <CustomIconButton
            disabled={!tableMeta.rowData[3]}
            type="print"
            handleClick={() => prepareTicketPlacement(value, "PRINT")}
          />
        </>
      ),
    },
  },
];

export default getTicketColumn;
