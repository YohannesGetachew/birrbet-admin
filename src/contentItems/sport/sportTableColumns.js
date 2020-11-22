import React from "react";
import Tag from "../../components/tag";
import { CustomIconButton } from "../../components/buttons/iconButtons";
import { Button } from "@material-ui/core";

const getSportTableColumns = (theme, handleModalOpen, sportCount) => [
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
    name: "order",
    label: "Order",
    options: {
      customBodyRender: (value) => (value ? value : "Not assigned"),
      sortCompare: (order) => {
        return (obj1, obj2) => {
          let val1 = parseInt(obj1.data);
          let val2 = parseInt(obj2.data);
          const notAssignedToNum = sportCount + 1;
          if (isNaN(val1)) val1 = notAssignedToNum;
          if (isNaN(val2)) val2 = notAssignedToNum;
          return (val1 - val2) * (order === "asc" ? -1 : 1);
        };
      },
    },
  },

  {
    name: "_id",
    label: "Actions",
    options: {
      filter: false,
      sort: false,
      sortDescFirst: true,
      customBodyRender: (id, tableMeta) => {
        const name = tableMeta.rowData[0];
        const isAvailable = tableMeta.rowData[1];
        const order = tableMeta.rowData[2];
        return (
          <Button
            size="small"
            variant="contained"
            style={{
              backgroundColor: theme.palette.accentTwo.dark,
              color: theme.palette.primary.light,
            }}
            onClick={() => handleModalOpen(id, order, name, isAvailable)}
          >
            Change order
          </Button>
        );
      },
    },
  },
];

export default getSportTableColumns;
