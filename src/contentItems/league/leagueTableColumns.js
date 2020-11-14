import { Button } from "@material-ui/core";
import React from "react";
import { CustomIconButton } from "../../components/buttons/iconButtons";
import Tag from "../../components/tag";

const getLeagueTableColumns = (
  theme,
  handleLeagueUpdate,
  mutate,
  isUpdating
) => [
  {
    name: "name",
    label: "Name",
  },
  // {
  //   name: "order",
  //   label: "Rank",
  // },
  // {
  //   name: "country",
  //   label: "Country",
  // },
  {
    name: "isAvailable",
    label: "Available",
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
            label={value ? "Yes" : "No"}
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
      customBodyRender: (value, tableMeta) => {
        const isAvailable = tableMeta.rowData[3];
        return (
          <CustomIconButton
            handleClick={() => handleLeagueUpdate(isAvailable, value, mutate)}
            locked={!isAvailable}
            type="lock"
            loading={isUpdating}
          />
        );
      },
    },
  },
];

export default getLeagueTableColumns;
