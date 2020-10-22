import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Field } from "formik";

import textFieldStyle from "./style";

// ...rest : {label, type, fullWidth, variant, autoComplete}
const FieldText = ({ name, dark, ...rest }) => {
  const style = textFieldStyle({ dark });
  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <TextField
            className={style.root}
            {...field}
            {...rest}
            error={meta.error && meta.touched}
            helperText={meta.touched && meta.error}
          />
        );
      }}
    </Field>
  );
};
export default FieldText;

FieldText.prototype = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  customStyle: PropTypes.object,
  autocomplete: PropTypes.string,
  dark: PropTypes.bool,
};

FieldText.defaultProps = {
  fullWidth: true,
  autoComplete: "off",
  type: "text",
  dark: false,
};
