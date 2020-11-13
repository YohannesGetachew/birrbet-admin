import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

const SelectFieldFilter = ({ label, data, changeHandler, displayProps }) => {
  const { filterList, onChange, index, column } = displayProps;
  const defaultChangeHandler = (event) => {
    filterList[index][0] = event.target.value;
    onChange(filterList[index], index, column);
  };
  return (
    <TextField
      select
      label={label}
      onChange={changeHandler ? changeHandler : defaultChangeHandler}
    >
      {data.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectFieldFilter;
