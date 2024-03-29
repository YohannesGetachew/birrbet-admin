import React from "react";
import Tag from "../../components/tag";
import { CustomIconButton } from "../../components/buttons/iconButtons";

const getMarketColumns = (theme, mutate, handleSportUpdate, isUpdating) => [
  {
    name: "name",
    label: "Market name",
  },
  {
    name: "isAvailable",
    label: "Is available",
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
            textColor={colors.color}
            backgroundColor={colors.backgroundColor}
          />
        );
      },
    },
  },
  {
    name: "_id",
    label: "Actions",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        const isAvailable = tableMeta.rowData[1];
        return (
          <CustomIconButton
            type="lock"
            locked={!isAvailable}
            loading={isUpdating}
            handleClick={() => handleSportUpdate(value, isAvailable, mutate)}
          />
        );
      },
    },
  },
];

export default getMarketColumns;
