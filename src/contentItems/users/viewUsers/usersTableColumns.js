import React from "react";
import { Avatar, Grid } from "@material-ui/core";
import Tag from "../../../components/tag";
import getCustomFilterListOptions from "../../../components/table/DefaultColumnConfigs";
import { SelectFieldFilter } from "../../../components/fields/muiDatatableFilters";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../../components/buttons/iconButtons";

const gerUsersTableColumns = (theme, history) => [
  {
    name: "nameAndPic",
    label: "Name",
    options: {
      ...getCustomFilterListOptions("Name"),
      customBodyRender: (value, tableMeta) => {
        const even = tableMeta.rowIndex % 2 === 0;
        return (
          <Grid container alignItems="center">
            <Avatar
              style={{
                color: even
                  ? theme.palette.primary.main
                  : theme.palette.accentOne.main,
                backgroundColor: even
                  ? `${theme.palette.accentOne.main}44`
                  : `${theme.palette.primary.main}88`,
                width: "30px",
                height: "30px",
                fontSize: "14px",
              }}
            >
              {value.name[0]}
            </Avatar>
            <span style={{ marginLeft: "5px" }}>{value.name}</span>
          </Grid>
        );
      },
      filterOptions: {
        logic: (value, filters, row) => {
          if (filters.length)
            return !filters.filter((item) =>
              value.name.toLowerCase().includes(item.toLowerCase())
            ).length;
          return true;
        },
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
          const selectFieldData = [
            { value: "All", label: "All" },
            { value: "SUPER_ADMIN", label: "SUPER_ADMIN" },
            { value: "ADMIN", label: "ADMIN" },
            { value: "CUSTOMER", label: "CUSTOMER" },
          ];
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
    name: "isActive",
    label: "Is active",
    options: {
      filterType: "custom",
      ...getCustomFilterListOptions("Is active", (value) =>
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
      customBodyRender: (value) => {
        return (
          <CustomIconButton
            type="edit"
            handleClick={() => history.push(`/admin/users/edit/${value}`)}
          />
        );
      },
    },
  },
];

export default gerUsersTableColumns;
