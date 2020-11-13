import React from "react";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../../../components/buttons/iconButtons";
import { convertFromUnix } from "../../../../utils/date";
import {
  DatePicker,
  SelectFieldFilter,
} from "../../../../components/fields/muiDatatableFilters";
import getCustomFilterListOptions from "../../../../components/table/DefaultColumnConfigs";
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
    options: {
      ...getCustomFilterListOptions("Date", null, "date"),
      customBodyRender: (values) => {
        return convertFromUnix(values);
      },
      filterType: "custom",
      filterOptions: {
        fullWidth: true,
        logic: (value, filters, row) => {
          let startDate = filters[0];
          let endDate = filters[1];
          const currentDate = new Date(value);
          if (filters.length) {
            startDate = new Date(startDate);
            endDate = new Date(endDate);
            if (currentDate <= endDate && currentDate >= startDate)
              return false;
            else return true;
          }
          return false;
        },
        display: (filterList, onChange, index, column) => (
          <DatePicker displayProps={{ filterList, onChange, index, column }} />
        ),
      },
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
              backgroundColor: tableMeta.rowData[4]
                ? theme.palette.primary.light
                : theme.palette.accentTwo.dark,
              color: tableMeta.rowData[4]
                ? theme.palette.accentOne.light
                : theme.palette.primary.main,
              marginRight: "10px",
            }}
            disabled={tableMeta.rowData[4]}
            onClick={() => prepareTicketPlacement(value, "PLACE")}
          >
            {tableMeta.rowData[4] ? "Placed" : "Place"}
          </Button>
          <CustomIconButton
            disabled={!tableMeta.rowData[4]}
            type="print"
            handleClick={() => prepareTicketPlacement(value, "PRINT")}
          />
        </>
      ),
    },
  },
];

export default getTicketColumn;
