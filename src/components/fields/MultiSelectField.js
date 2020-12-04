import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Field } from "formik";
import textFieldStyle from "./style";

const FieldMultiSelect = ({
  name,
  label,
  data,
  variant,
  placeholder,
  defaultValue,
  darkMode,
}) => {
  const style = textFieldStyle({ darkMode });
  return (
    <Field name={name}>
      {({
        field: { name, value, onBlur },
        form: { setFieldValue, values },
        meta,
      }) => (
        <div>
          <Autocomplete
            multiple
            defaultValue={[...defaultValue]}
            options={data}
            onChange={(e, value) => setFieldValue(name, value)}
            onBlur={onBlur}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                className={style.root}
                {...params}
                name={name}
                value={value}
                label={label}
                variant={variant || "standard"}
                placeholder={placeholder}
                error={meta.error && meta.touched}
                helperText={meta.touched && meta.error}
              />
            )}
          />
        </div>
      )}
    </Field>
  );
};

export default FieldMultiSelect;

FieldMultiSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  darkMode: PropTypes.bool,
};

FieldMultiSelect.defaultProps = {
  variant: "standard",
  defaultValue: [],
  dark: false,
};
