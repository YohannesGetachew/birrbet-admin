import React from "react";
import { Button } from "@material-ui/core";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { convertFromUnix } from "../../../../utils/date";

const ticketColumn = [
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
        const colors = { PENDING: "orange", LOSE: "red", WIN: "green" };
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
          <CheckRoundedIcon style={{ color: "green" }} />
        ) : (
          <ClearRoundedIcon style={{ color: "#f5425d" }} />
        ),
    },
  },
  {
    name: "_id",
    label: "Actions",
    options: {
      print: false,
      filter: false,
      download: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Place
          </Button>
          <Button size="small" color="secondary" variant="contained">
            Print
          </Button>
        </>
      ),
    },
  },
];

export default ticketColumn;
