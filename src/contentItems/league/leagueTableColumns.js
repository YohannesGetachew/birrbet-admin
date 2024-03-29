import { Button } from "@material-ui/core";
import React from "react";
import { CustomIconButton } from "../../components/buttons/iconButtons";
import Tag from "../../components/tag";

const getLeagueTableColumns = (
  theme,
  handleModalOpen,
  isUpdating,
  editLeagueAvailability,
  mutate
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
    name: "country.name",
    label: "Country name",
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
            label={value ? "Yes" : "No"}
            textColor={colors.color}
            backgroundColor={colors.backgroundColor}
          />
        );
      },
    },
  },
  {
    name: "country.flag",
    label: "Country flag",
    options: {
      filter: "false",
      sort: "false",
      customBodyRender: (value) => {
        return <img width="20px" height="20px" src={value} alt={"name"} />;
      },
    },
  },
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
        const isTop = tableMeta.rowData[4];
        const isAvailable = tableMeta.rowData[2];
        return (
          <>
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: isTop
                  ? theme.palette.accentTwo.dark
                  : theme.palette.secondary.main,
                color: theme.palette.primary.light,
              }}
              onClick={() => handleModalOpen(isTop, isAvailable, value)}
            >
              {isTop ? "Remove from top" : "Make top"}
            </Button>
            <CustomIconButton
              type="lock"
              locked={!isAvailable}
              loading={isUpdating}
              handleClick={() =>
                editLeagueAvailability(value, isAvailable, isTop, mutate)
              }
            />
          </>
        );
      },
    },
  },
];

export default getLeagueTableColumns;
