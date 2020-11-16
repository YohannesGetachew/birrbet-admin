import React from "react";
import { convertFromUnix } from "../../../utils/date";
import { DatePicker } from "../../fields/muiDatatableFilters";

const getCustomFilterListOptions = (columnName, renderCustomValue, type) => {
  return {
    customFilterListOptions: {
      render: (value) => {
        let valueToReturn;
        if (type === "date") {
          if (value.length && value.length === 2)
            valueToReturn = `From:${value[0]} - To:${value[1]}`;
          else {
            valueToReturn = `From: ${value[2]} ( ${value[0]} ) - To:${value[1]}`;
          }
        } else {
          valueToReturn = renderCustomValue ? renderCustomValue(value) : value;
        }
        return (
          <>
            <b>{columnName}: </b>
            {valueToReturn}
          </>
        );
      },
      update: (filterList, filterPos, index) => {
        filterList[index] = [];
        return filterList;
      },
    },
  };
};

const getDateConfig = () => {
  return {
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
  };
};

export { getCustomFilterListOptions, getDateConfig };
