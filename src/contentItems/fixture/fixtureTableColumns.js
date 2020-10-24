import React from "react";
import Tag from "../../components/tag";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../components/buttons/iconButtons";

export const FixtureStatus = {
  TBD: "Time To Be Defined",
  NS: "Not Started",
  "1H": "First Half, Kick Off",
  HT: "Halftime",
  "2H": "Second Half, 2nd Half Started",
  ET: "Extra Time",
  P: "Penalty In Progress",
  FT: "Match Finished",
  AET: "Match Finished After Extra Time",
  PEN: "Match Finished After Penalty",
  BT: "Break Time (in Extra Time)",
  SUSP: "Match Suspended",
  INT: "Match Interrupted",
  PST: "Match Postponed",
  CANC: "Match Cancelled",
  ABD: "Match Abandoned",
  AWD: "Technical Loss",
  WO: "WalkOver",
};

const getFixtureTableColumns = (
  theme,
  mutate,
  handleFixtureUpdate,
  isUpdating
) => [
  {
    name: "date",
    label: "Starting time",
  },
  {
    name: "status",
    label: "Has started",
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
            label={FixtureStatus[value]}
            textColor={colors.color}
            backgroundColor={colors.backgroundColor}
          />
        );
      },
    },
  },
  {
    name: "sport",
    label: "Sport",
  },
  {
    name: "teams",
    label: "Teams",
    options: {
      customBodyRender: (value) => {
        return `${value.home.name} vs ${value.away.name}`;
      },
    },
  },
  {
    name: "league",
    label: "League",
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
    name: "_id",
    label: "Actions",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        const isAvailable = tableMeta.rowData[5];
        return (
          <CustomIconButton
            type="lock"
            locked={!isAvailable}
            loading={isUpdating}
            handleClick={() => handleFixtureUpdate(value, isAvailable, mutate)}
          />
        );
      },
    },
  },
];

export default getFixtureTableColumns;

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
