import React from "react";
import Tag from "../../components/tag";
import { CustomIconButton } from "../../components/buttons/iconButtons";

const getSportTableColumns = (theme, mutate, handleSportUpdate, isUpdating) => [
  {
    name: "name",
    label: "Sport name",
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

export default getSportTableColumns;

// date: "2020-10-15T14:30:00+03:00"
// id: 625511
// isAvailable: true
// league: "Svenska Cupen"
// sport: "Soccer"
// status: "NS"
// teams: {__typename: "Teams", home: {…}, away: {…}}
// teams:
// away: {__typename: "Team", name: "Ostersunds FK"}
// home: {__typename: "Team", name: "Nyköping"}
// __typename: "Teams"
// __proto__: Object
// __typename: "Fixture"
// _id: "5f882f576a78001cdbae78b1"
