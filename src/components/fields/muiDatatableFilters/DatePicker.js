import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { getFormattedDate } from "../../../utils/date";
import { Grid } from "@material-ui/core";

const DatePicker = ({ displayProps }) => {
  const { filterList, onChange, index, column } = displayProps;
  const defaultStartDate = "01/01/2010";
  const formattedToday = getFormattedDate(new Date());
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(formattedToday);
  const defaultDateChangeHandler = (date, pickerType) => {
    const formattedDate =
      date.toString() !== "Invalid Date" ? getFormattedDate(date) : "00/00/00";

    if (pickerType === "start") {
      setStartDate(date);
      filterList[index][0] = formattedDate;
      if (!filterList[index][1]) filterList[index][1] = formattedToday;
      onChange(filterList[index], index, column);
    } else {
      setEndDate(date);
      filterList[index][1] = formattedDate;
      if (!filterList[index][0]) filterList[index][0] = defaultStartDate;
      onChange(filterList[index], index, column);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            label="Start date (m/d/y)"
            format="MM/dd/yy"
            value={startDate}
            onChange={(date) => defaultDateChangeHandler(date, "start")}
            showTodayButton={true}
            autoOk={true}
            maxDate={endDate}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            label="End date (m/d/y)"
            format="MM/dd/yy"
            value={endDate}
            onChange={(date) => defaultDateChangeHandler(date, "end")}
            showTodayButton={true}
            autoOk={true}
            minDate={startDate}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
