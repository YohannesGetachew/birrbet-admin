import { Button } from "@material-ui/core";
import React from "react";
import { CustomIconButton } from "../../components/buttons/iconButtons";
import Tag from "../../components/tag";

const getLeagueTableColumns = (theme, handleModalOpen) => [
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
    name: "isTop",
    label: "Is top",
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
      sort: false,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        const isTop = tableMeta.rowData[1];
        return (
          <Button
            size="small"
            variant="contained"
            style={{
              backgroundColor: isTop
                ? theme.palette.accentTwo.dark
                : theme.palette.secondary.main,
              color: theme.palette.primary.light,
            }}
            onClick={() => handleModalOpen(isTop, value)}
          >
            {isTop ? "Remove from top" : "Make top"}
          </Button>
        );
      },
    },
  },
];

export default getLeagueTableColumns;
