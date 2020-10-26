import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import React from "react";
import RichTextField from "../../../components/fields/RichTextField";
import { SubmitButton } from "../../../components/buttons";
import { AlertError } from "../../../components/errors";
import { UPDATE_APP } from "../../../graphql/app";
import rulesSettingStyle from "./style";

const handleSubmit = async (values, mutate, setSubmitting, app) => {
  console.log(app);
  setSubmitting(true);
  try {
    await mutate({
      variables: { id: app._id, appInput: { rules: values.rules } },
    });
    setSubmitting(true);
    window.location.reload(false);
  } catch (err) {
    setSubmitting(true);
    return;
  }
};

const RulesSetting = ({ app }) => {
  const [mutate, { error }] = useMutation(UPDATE_APP);
  const style = rulesSettingStyle();

  return (
    <>
      {error && <AlertError />}
      <Formik
        initialValues={{ rules: app.rules }}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, mutate, setSubmitting, app)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={style.root}>
              <div className={style.richTextC}>
                <RichTextField name="rules" label="Application rules" />
              </div>
              <div className={style.buttonC}>
                <SubmitButton label="Save" isSubmitting={isSubmitting} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RulesSetting;
