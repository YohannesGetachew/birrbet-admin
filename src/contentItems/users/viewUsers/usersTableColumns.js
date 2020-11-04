import { Avatar, FormControl, Grid, TextField } from "@material-ui/core";
import React from "react";
import Tag from "../../../components/tag";
import { ClearRounded, CheckRounded } from "@material-ui/icons";
import { CustomIconButton } from "../../../components/buttons/iconButtons";
import FieldText from "../../../components/fields/TextField";
const gerUsersTableColumns = (theme, history) => [
  {
    name: "nameAndPic",
    label: "Name",
    options: {
      // filterType: "custom",
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
        display: (filterList, onChange, index, column) => {
          return (
            <FormControl>
              <TextField
                label="Name"
                value={filterList[index][0] || ""}
                onChange={(event) => {
                  filterList[index][0] = event.target.value;
                  onChange(filterList[index], index, column);
                }}
              />
            </FormControl>
          );
        },
      },
    },
  },
  {
    name: "username",
    label: "Username",
  },
  {
    name: "role",
    label: "Role",
    options: {
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
