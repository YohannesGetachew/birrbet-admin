import React, { useState } from "react";
import { TextField, MenuItem } from "@material-ui/core";

const SelectFieldFilter = ({
  label,
  data,
  customChangeHandlingLogic,
  displayProps,
  selectValueIndex,
}) => {
  const { filterList, onChange, index, column } = displayProps;
  const initialSelectValue = filterList[index][selectValueIndex]
    ? filterList[index][selectValueIndex]
    : "";
  const [value, setValue] = useState(initialSelectValue);
  const handleChange = (event) => {
    if (customChangeHandlingLogic) {
      customChangeHandlingLogic(event);
    } else {
      filterList[index][0] = event.target.value;
      onChange(filterList[index], index, column);
    }
    setValue(event.target.value);
  };
  return (
    <TextField
      fullWidth={true}
      select
      label={label}
      value={value}
      onChange={handleChange}
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
