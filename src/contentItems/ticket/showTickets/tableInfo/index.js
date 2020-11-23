import React from "react";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../../../components/buttons/iconButtons";
import { convertFromUnix } from "../../../../utils/date";
import {
  DatePicker,
  SelectFieldFilter,
} from "../../../../components/fields/muiDatatableFilters";
import {
  getCustomFilterListOptions,
  getDateConfig,
} from "../../../../components/table/DefaultColumnConfigs";
import { calculateTicketReturns } from "../helper";
import { Button } from "@material-ui/core";

const getTicketColumn = (theme, prepareTicketPlacement) => [
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
    options: {
      display: "exclude",
      filter: false,
    },
  },
  {
    name: "vatValue",
    label: "Possible win",
    options: {
      customBodyRender: (vatValue, tableMeta) => {
        const stake = tableMeta.rowData[2];
        const totalOdds = tableMeta.rowData[3];
        const ticketReturns = calculateTicketReturns(
          stake,
          stake * 0.15,
          totalOdds
        ).estimatedReturns;
        return ticketReturns;
      },
    },
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
      customBodyRender: (value, tableMeta, updateValue) =>
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
    name: "updatedAt",
    label: "Date",
    ...getDateConfig(),
  },
  {
    name: "_id",
    label: "Actions",
    options: {
      print: false,
      filter: false,
      sort: false,
      download: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const isPlaced = tableMeta.rowData[6];
        return (
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
            <CustomIconButton
              disabled={!isPlaced}
              type="print"
              handleClick={() => prepareTicketPlacement(value, "PRINT")}
            />
          </>
        );
      },
    },
  },
];

export default getTicketColumn;
