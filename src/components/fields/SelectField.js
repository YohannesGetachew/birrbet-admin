import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Field } from "formik";
import PropTypes from "prop-types";
import textFieldStyle from "./style";

// rest variant label fullwidth
const FieldSelect = ({ name, data, dark, dataDetails, ...rest }) => {
  const style = textFieldStyle({ dark });
  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <TextField
          className={style.root}
          select
          {...field}
          {...rest}
          error={meta.error && meta.touched}
          helperText={meta.touched && meta.error}
        >
          {data.map((option) => (
            <MenuItem
              key={option[dataDetails.accessor]}
              value={option[dataDetails.accessor]}
            >
              {option[dataDetails.accessed]}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Field>
  );
};
export default FieldSelect;

FieldSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  dataDetails: PropTypes.shape({
    accessor: PropTypes.string,
    accessed: PropTypes.string,
  }),
  dark: PropTypes.bool,
};

FieldSelect.defaultProps = {
  variant: "standard",
  fullWidth: true,
  dataDetails: {
    accessor: "_id",
    accessed: "name",
  },
  dark: false,
};
