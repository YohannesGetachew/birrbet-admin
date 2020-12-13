import React from "react";
import Tag from "../../components/tag";
// import { ClearRounded, CheckRounded } from "@material-ui/icons";
// import { CustomIconButton } from "../../components/buttons/iconButtons";

export const FixtureStatus = [
  "Not_started_yet",
  "In_progress",
  "Finished",
  "Cancelled",
  "Postponed",
  "Interrupted",
  "Abandoned",
  "Coverage_lost",
  "About_to_start",
];

const getFixtureTableColumns = (
  theme
  // mutate,
  // handleFixtureUpdate,
  // isUpdating
) => [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "startDate",
    label: "Starting time",
  },
  {
    name: "status",
    label: "Status",
    options: {
      customBodyRender: (value) => {
        const colors = {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.dark,
        };
        return (
          <Tag
            label={value}
            textColor={colors.color}
            backgroundColor={colors.backgroundColor}
          />
        );
      },
    },
  },
  {
    name: "sportName",
    label: "Sport",
  },
  {
    name: "countryName",
    label: "Country",
  },
  {
    name: "participants",
    label: "Participants",
    options: {
      customBodyRender: (participants) => {
        const participantNames = participants.map(
          (participant) => participant.name
        );
        if (participantNames.length === 2) return participantNames.join(" vs ");
        return participantNames.join();
      },
    },
  },
  {
    name: "league",
    label: "League",
  },
  // {
  //   name: "isAvailable",
  //   label: "Is available",
  //   options: {
  //     customBodyRender: (value) => {
  //       const colors = value
  //         ? {
  //             backgroundColor: theme.palette.success.light,
  //             color: theme.palette.success.dark,
  //           }
  //         : {
  //             backgroundColor: theme.palette.error.light,
  //             color: theme.palette.error.dark,
  //           };

  //       return (
  //         <Tag
  //           label={value ? "Yes" : "No"}
  //           textColor={colors.color}
  //           backgroundColor={colors.backgroundColor}
  //         />
  //       );
  //     },
  //   },
  // },
  // {
  //   name: "_id",
  //   label: "Actions",
  //   options: {
  //     filter: false,
  //     sort: false,
  //     customBodyRender: (value, tableMeta) => {
  //       const isAvailable = tableMeta.rowData[5];
  //       return (
  //         <CustomIconButton
  //           type="lock"
  //           locked={!isAvailable}
  //           loading={isUpdating}
  //           handleClick={() => handleFixtureUpdate(value, isAvailable, mutate)}
  //         />
  //       );
  //     },
  //   },
  // },
];

export default getFixtureTableColumns;
