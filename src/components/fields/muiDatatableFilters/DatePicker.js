import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  getBeginningOfMonth,
  getBeginningOfWeek,
  getFormattedDate,
  getDateRelativeToToday,
  getWeekRelativeToThisWeek,
  getMonthRelativeToThisMonth,
} from "../../../utils/date";
import { Grid } from "@material-ui/core";
import SelectFieldFilter from "./SelectFieldFilter";

const DatePicker = ({ displayProps }) => {
  const { filterList, onChange, index, column } = displayProps;
  const defaultStartDate = "01/01/2010";
  const formattedToday = getFormattedDate(new Date());
  const [startDate, setStartDate] = useState(
    filterList[index][0] || defaultStartDate
  ); // here if display props.filters is present make it that
  const [endDate, setEndDate] = useState(
    filterList[index][1] || formattedToday
  );
  const defaultDateChangeHandler = (date, pickerType) => {
    if (date === "NaN/NaN/NaN") {
    }
    let startDate;
    let endDate;
    if (pickerType === "start") {
      startDate = date;
      endDate = filterList[index][1] ? filterList[index][1] : formattedToday;
      const isDateRangeValid = validateDateRange(startDate, endDate);
      if (!isDateRangeValid) {
        endDate = startDate;
      }
    }
    if (pickerType === "end") {
      startDate = filterList[index][0]
        ? filterList[index][0]
        : defaultStartDate;
      endDate = date;
      const isDateRangeValid = validateDateRange(startDate, endDate);
      if (!isDateRangeValid) {
        startDate = endDate;
      }
    }
    setStartDate(startDate);
    setEndDate(endDate);
    filterList[index][0] = startDate;
    filterList[index][1] = endDate;
    onChange(filterList[index], index, column);
  };

  const validateDateRange = (startDate, endDate) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    console.log(startDate > endDate);
    if (startDate > endDate) return false;
    else return true;
  };

  const handleDateSpanChange = (event) => {
    let date;
    switch (event.target.value) {
      case "today":
        date = formattedToday;
        break;
      case "yesterday":
        date = getDateRelativeToToday(-1);
        break;
      case "dayBeforeYesterday":
        date = getDateRelativeToToday(-2);
        break;
      case "thisWeek":
        date = getBeginningOfWeek();
        break;
      case "lastWeek":
        date = getWeekRelativeToThisWeek(-1);
        break;
      case "weekBeforeLast":
        date = getWeekRelativeToThisWeek(-2);
        break;
      case "thisMonth":
        date = getBeginningOfMonth();
        break;
      case "lastMonth":
        date = getMonthRelativeToThisMonth(-1);
        break;
      case "monthBeforeLast":
        date = getMonthRelativeToThisMonth(-2);
        break;
      default:
        break;
    }
    const selectedDateSpanData = dateSpanSelectData.filter(
      (item) => item.value === event.target.value
    );
    filterList[index][2] = selectedDateSpanData[0].label;
    defaultDateChangeHandler(date, "start");
  };

  const dateSpanSelectData = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "dayBeforeYesterday", label: "Day before Yesterday" },
    { value: "thisWeek", label: "This week" },
    { value: "lastWeek", label: "Last week" },
    { value: "weekBeforeLast", label: "Week before last" },
    { value: "thisMonth", label: "This month" },
    { value: "lastMonth", label: "Last month" },
    { value: "monthBeforeLast", label: "Month before last" },
  ];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            label="Start date (m/d/y)"
            format="MM/dd/yy"
            value={startDate}
            onChange={(date) =>
              defaultDateChangeHandler(getFormattedDate(date), "start")
            }
            showTodayButton={true}
            autoOk={true}
            maxDate={endDate}
            maxDateMessage="Start date should be less than end date"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            label="End date (m/d/y)"
            format="MM/dd/yy"
            value={endDate}
            onChange={(date) =>
              defaultDateChangeHandler(getFormattedDate(date), "end")
            }
            showTodayButton={true}
            autoOk={true}
            minDate={startDate}
            minDateMessage="End date should be greater than start date"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectFieldFilter
            label="Begins from"
            data={dateSpanSelectData}
            customChangeHandlingLogic={handleDateSpanChange}
            displayProps={displayProps}
            selectValueIndex={2}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
