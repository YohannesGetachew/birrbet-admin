import React from "react";

const getCustomFilterListOptions = (columnName, renderCustomValue, type) => {
  return {
    customFilterListOptions: {
      render: (value) => {
        let valueToReturn;
        if (type === "date") {
          if (value.length && value.length === 2)
            valueToReturn = `From:${value[0]} - To:${value[1]}`;
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
    },
  };
};

export default getCustomFilterListOptions;
