import React from "react";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../../../components/buttons/iconButtons";

import { SelectFieldFilter } from "../../../../components/fields/muiDatatableFilters";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../../components/table/DefaultColumnConfigs";
import { calculateTicketReturns } from "../../../../utils/ticketCalculation";
import { Button } from "@material-ui/core";

const getTicketColumn = (theme, prepareTicketPlacement, maxWin, role) => [
  {
    name: "ticketID",
    label: "Ticket code",
    options: {},
  },
  {
    name: "placementID",
    label: "Placement code",
    options: {
      customBodyRender: (value) => {
        return value ? value : "Not placed";
      },
    },
  },
  {
    name: "stake",
    label: "Stake",
  },
  {
    name: "totalOdds",
    label: "Possible win",
    options: {
      customBodyRender: (totalOdds, tableMeta) => {
        const stake = tableMeta.rowData[2];
        const possibleWin = calculateTicketReturns(stake, totalOdds, maxWin)
          .possibleWin;
        return possibleWin;
      },
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      customBodyRender: (value) => {
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
      ...getCustomFilterListOptions("Status", (value) =>
        value[0] === "All" ? "All" : value[0]
      ),
      filterType: "custom",
      filterOptions: {
        logic: (value, filters, row) => {
          const filter = filters[0];
          if (filter === "All" || filter === undefined) {
            return false;
          }
          return !(value === filter);
        },
        display: (filterList, onChange, index, column) => {
          const selectFieldData = [
            { value: "All", label: "All" },
            { value: "PENDING", label: "PENDING" },
            { value: "WIN", label: "WIN" },
            { value: "LOSE", label: "LOSE" },
          ];
          return (
            <SelectFieldFilter
              label="Status"
              data={selectFieldData}
              displayProps={{ filterList, onChange, index, column }}
            />
          );
        },
      },
    },
  },
  {
    name: "isPlaced",
    label: "Placed",
    options: {
      customBodyRender: (value) =>
        value ? (
          <CheckRounded style={{ color: theme.palette.success.main }} />
        ) : (
          <ClearRounded style={{ color: theme.palette.error.main }} />
        ),
      ...getCustomFilterListOptions("Placed", (value) =>
        value[0] === "All" ? "All" : value[0] ? "Yes" : "No"
      ),
      filterType: "custom",
      filterOptions: {
        logic: (value, filters, row) => {
          const filter = filters[0];
          if (filter === "All" || filter === undefined) {
            return false;
          }
          return !(value === filter);
        },
        display: (filterList, onChange, index, column) => {
          const selectFieldData = [
            { value: "All", label: "All" },
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ];
          return (
            <SelectFieldFilter
              label="Placed"
              data={selectFieldData}
              displayProps={{ filterList, onChange, index, column }}
            />
          );
        },
      },
    },
  },
  {
    name: "placedDate",
    label: "Date",
    ...getDateConfig(true, false),
  },
  {
    name: "_id",
    label: "Actions",
    options: {
      print: false,
      filter: false,
      sort: false,
      download: false,
      customBodyRender: (value, tableMeta) => {
        const isPlaced = tableMeta.rowData[5];
        return (
          <>
            {role === "CASHIER" && (
              <>
                <Button
                  size="small"
                  style={{
                    backgroundColor: isPlaced
                      ? theme.palette.primary.light
                      : theme.palette.accentTwo.dark,
                    color: isPlaced
                      ? theme.palette.accentOne.light
                      : theme.palette.primary.main,
                    marginRight: "10px",
                  }}
                  disabled={isPlaced}
                  onClick={() => prepareTicketPlacement(value, "PLACE")}
                >
                  {isPlaced ? "Placed" : "Place"}
                </Button>
                <span style={{ marginLeft: "8px", marginTop: "8px" }}></span>
                <CustomIconButton
                  disabled={!isPlaced}
                  type="print"
                  handleClick={() => prepareTicketPlacement(value, "PRINT")}
                />
                <span style={{ marginLeft: "8px", marginTop: "8px" }}></span>
              </>
            )}

            <CustomIconButton
              type="view"
              handleClick={() => prepareTicketPlacement(value, "VIEW")}
            />
          </>
        );
      },
    },
  },
];

export default getTicketColumn;
