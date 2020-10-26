import React from "react";

import FormHelperText from "@material-ui/core/FormHelperText";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Field } from "formik";

const FieldRichText = ({ name, label }) => {
  const config = {
    placeholder: label,
    removePlugins: [
      "MediaEmbed",
      "Image",
      "ImageCaption",
      "ImageStyle",
      "ImageTextAlternative",
      "ImageToolbar",
      "ImageUpload",
    ],
  };

  return (
    <Field name={name}>
      {({
        field: { value, name },
        form: { setFieldValue, setFieldTouched },
        meta,
      }) => (
        <div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={value}
              onBlur={() => setFieldTouched({ [name]: true })}
              onChange={(e, editor) => setFieldValue(name, editor.getData())}
              config={config}
            />
          </div>
          <div>
            <FormHelperText error={meta.error && meta.touched}>
              {meta.touched && meta.error}
            </FormHelperText>
          </div>
        </div>
      )}
    </Field>
  );
};

export default FieldRichText;
