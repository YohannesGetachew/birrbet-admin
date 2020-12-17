import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Field } from "formik";
import textFieldStyle from "./style";

const AutocompleteField = ({
  name,
  label,
  data,
  variant,
  placeholder,
  defaultValue,
  dark,
}) => {
  const style = textFieldStyle({ dark });
  return (
    <Field name={name}>
      {({
        field: { name, value, onBlur },
        form: { setFieldValue, values },
        meta,
      }) => (
        <div>
          <Autocomplete
            options={data}
            onChange={(e, value) => setFieldValue(name, value)}
            onBlur={onBlur}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                className={style.root}
                {...params}
                name={name}
                value={value}
                label={label}
                variant={variant || "standard"}
                placeholder={placeholder}
                {...params}
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

export default AutocompleteField;
