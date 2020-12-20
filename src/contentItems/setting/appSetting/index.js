import { useMutation } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { SubmitButton } from "../../../components/buttons";
import { AlertError } from "../../../components/errors";
import { TextField } from "../../../components/fields";
import { UPDATE_APP } from "../../../graphql/app";
import * as Yup from "yup";
import appStyle from "./style";

const getInitialValues = (app) => {
  return {
    appName: app.appName,
    maxWin: app.maxWin,
    maxStake: app.maxStake,
    minStake: app.minStake,
    withdrawalLimit: app.withdrawalLimit,
    commissionRate: app.commissionRate,
    vatRate: app.vatRate,
  };
};

const validationSchema = Yup.object().shape({
  appName: Yup.string().required("App name is required"),
  maxWin: Yup.number()
    .typeError("Please provide a number")
    .required("Maximum win is required"),
  maxStake: Yup.number()
    .typeError("Please provide a number")
    .required("Maximum stake is required"),
  minStake: Yup.number()
    .typeError("Please provide a number")
    .required("minimum stake is required"),
  withdrawalLimit: Yup.number()
    .typeError("Please provide a number")
    .required("Withdrawal limit is required"),
  commissionRate: Yup.number()
    .typeError("Please provide a number")
    .required("Comission rate is required"),
  vatRate: Yup.number()
    .typeError("Please provide a number")
    .required("Vat rate is required"),
});

const handleSubmit = async (values, setSubmitting, mutate, app) => {
  setSubmitting(true);
  try {
    await mutate({ variables: { id: app._id, appInput: values } });
    // setSubmitting(false);
    window.location.reload(false);
  } catch (err) {
    setSubmitting(false);
    return;
  }
};

const AppSetting = ({ app }) => {
  const [mutate, { error }] = useMutation(UPDATE_APP);
  const style = appStyle();
  return (
    <>
      {error && <AlertError />}
      <Formik
        initialValues={getInitialValues(app)}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting, mutate, app)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container className={style.root}>
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField name="appName" label="App name" />
              </Grid>
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField name="maxWin" label="Maximum win" type="number" />
              </Grid>
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField
                  name="maxStake"
                  label="Maximum stake"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField
                  name="minStake"
                  label="Minimum stake"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField
                  name="withdrawalLimit"
                  label="Withdrawal Limit"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField
                  name="commissionRate"
                  label="Commission Rate"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField name="vatRate" label="VAT Rate" type="number" />
              </Grid>
              <Grid item container xs={12} className={style.submitBtnC}>
                <SubmitButton label="Save" isSubmitting={isSubmitting} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AppSetting;
