import React from "react";
import Tag from "../../../components/tag";
import { getCustomFilterListOptions } from "../../../components/table/DefaultColumnConfigs";
import { SelectFieldFilter } from "../../../components/fields/muiDatatableFilters";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../../components/buttons/iconButtons";
import { Button } from "@material-ui/core";

const gerUsersTableColumns = (
  theme,
  history,
  currentUserRole,
  prepForDelete
) => [
  {
    name: "firstName",
    options: {
      filter: "false",
      display: "exclude",
    },
  },
  {
    name: "lastName",
    label: "Name",
    options: {
      ...getCustomFilterListOptions("Name"),
      customBodyRender: (lastName, tableMeta) => {
        const firstName = tableMeta.rowData[0];
        return `${firstName} ${lastName}`;
      },
    },
  },
  {
    name: "username",
    label: "Username",
    options: {
      ...getCustomFilterListOptions("UserName"),
    },
  },
  {
    name: "accountBalance",
    label: "Current balance",
    options: {
      ...getCustomFilterListOptions("Current balance"),
      customBodyRender: (value) => {
        return value.toFixed(2);
      },
    },
  },
  {
    name: "role",
    label: "Role",
    options: {
      ...getCustomFilterListOptions("Role", (value) => value[0]),
      filterType: "custom",
      filterOptions: {
        logic: (value, filters, row) => {
          const filter = filters[0];
          if (filter === "All" || filter === undefined) {
            return false;
          }
          return !(value === filter);
        },
        display: (filterList, onChange, index, column) => {
          const selectFieldData =
            currentUserRole !== "CASHIER"
              ? [
                  { value: "All", label: "All" },
                  { value: "SUPER_ADMIN", label: "SUPER_ADMIN" },
                  { value: "ADMIN", label: "ADMIN" },
                  { value: "CUSTOMER", label: "CUSTOMER" },
                  { value: "CASHIER", label: "CASHIER" },
                ]
              : [{ value: "CUSTOMER", label: "CUSTOMER" }];
          return (
            <SelectFieldFilter
              label="Role"
              data={selectFieldData}
              displayProps={{ filterList, onChange, index, column }}
            />
          );
        },
      },
      customBodyRender: (value) => {
        const tagColor = {
          CUSTOMER: {
            textColor: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
          },
          SUPER_ADMIN: {
            textColor: theme.palette.error.dark,
            backgroundColor: theme.palette.error.light,
          },
          ADMIN: {
            textColor: theme.palette.secondary.dark,
            backgroundColor: theme.palette.secondary.light,
          },
          CASHIER: {
            textColor: theme.palette.secondary.dark,
            backgroundColor: theme.palette.success.main,
          },
        };
        return (
          <Tag
            label={value}
            textColor={tagColor[value].textColor}
            backgroundColor={tagColor[value].backgroundColor}
          />
        );
      },
    },
  },
  {
    name: "isVerified",
    label: "Is verified",
    options: {
      filterType: "custom",
      ...getCustomFilterListOptions("Is verified", (value) =>
        value[0] === "All" ? "All" : value[0] ? "Yes" : "No"
      ),
      filterOptions: {
        logic: (value, filters, row) => {
          const filter = filters[0];
          if (filter === "All" || filter === undefined) {
            return false;
          }
          return !(value === filter);
        },
        display: (filterList, onChange, index, column) => {
          const selectFieldData = [
            { value: "All", label: "All" },
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ];
          return (
            <SelectFieldFilter
              label="Is verified"
              data={selectFieldData}
              displayProps={{ filterList, onChange, index, column }}
            />
          );
        },
      },
      customBodyRender: (value) => {
        const style = {
          color: value ? theme.palette.success.main : theme.palette.error.light,
        };
        return value ? (
          <CheckRounded style={style} />
        ) : (
          <ClearRounded style={style} />
        );
      },
    },
  },
  {
    name: "isActive",
    label: "Is active",
    options: {
      filterType: "custom",
      ...getCustomFilterListOptions("Is verified", (value) =>
        value[0] === "All" ? "All" : value[0] ? "Yes" : "No"
      ),
      filterOptions: {
        logic: (value, filters, row) => {
          const filter = filters[0];
          if (filter === "All" || filter === undefined) {
            return false;
          }
          return !(value === filter);
        },
        display: (filterList, onChange, index, column) => {
          const selectFieldData = [
            { value: "All", label: "All" },
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ];
          return (
            <SelectFieldFilter
              label="Is active"
              data={selectFieldData}
              displayProps={{ filterList, onChange, index, column }}
            />
          );
        },
      },
      customBodyRender: (value) => {
        const style = {
          color: value ? theme.palette.success.main : theme.palette.error.light,
        };
        return value ? (
          <CheckRounded style={style} />
        ) : (
          <ClearRounded style={style} />
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
        const rowRole = tableMeta.rowData[4];
        const isActive = tableMeta.rowData[6];

        return (
          (currentUserRole === "SUPER_ADMIN" ||
            currentUserRole === "ADMIN") && (
            <>
              <CustomIconButton
                type="edit"
                handleClick={() => history.push(`/admin/users/edit/${value}`)}
                disabled={rowRole === "CUSTOMER"}
              />
              <div style={{ margin: "4px" }}></div>
              <Button
                disabled={rowRole === "SUPER_ADMIN"}
                onClick={() => prepForDelete(value, isActive)}
                size={"small"}
                variant={"contained"}
                style={{
                  backgroundColor: isActive
                    ? theme.palette.error.dark
                    : theme.palette.success.dark,
                  color: theme.palette.primary.main,
                }}
              >
                {isActive ? "Deactivate" : "Activate"}
              </Button>
            </>
          )
        );
      },
    },
  },
];

export default gerUsersTableColumns;

// customBodyRender: (value, tableMeta) => {
//   const even = tableMeta.rowIndex % 2 === 0;
//   return (
//     <Grid container alignItems="center">
//       <Avatar
//         style={{
//           color: even
//             ? theme.palette.primary.main
//             : theme.palette.accentOne.main,
//           backgroundColor: even
//             ? `${theme.palette.accentOne.main}44`
//             : `${theme.palette.primary.main}88`,
//           width: "30px",
//           height: "30px",
//           fontSize: "14px",
//         }}
//       >
//         {value.name[0]}
//       </Avatar>
//       <span style={{ marginLeft: "5px" }}>{value.name}</span>
//     </Grid>
//   );
// },
// filterOptions: {
//   logic: (value, filters, row) => {
//     if (filters.length)
//       return !filters.filter((item) =>
//         value.name.toLowerCase().includes(item.toLowerCase())
//       ).length;
//     return true;
//   },
// },
