import { useMutation } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { Style, TextFields } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { SubmitButton } from "../../../../components/buttons";
import { AlertError } from "../../../../components/errors";
import { SelectField, TextField } from "../../../../components/fields";
import AutocompleteField from "../../../../components/fields/autocomplet";
import { MAKE_TRANSACTION } from "../../../../graphql/transaction";
import transactionFormStyle from "./style";

const initialValues = {
  customer: "",
  amount: "",
};

const getValidationSchema = (type) =>
  Yup.object().shape({
    customer: Yup.string().required("Please choose a customer"),
    amount:
      type === "DEPOSIT"
        ? Yup.number()
            .typeError("Only numbers are allowed")
            .min(10, "Please put atleast 10 birr")
            .required("Amount is required")
        : Yup.number()
            .typeError("Only numbers are allowed")
            .min(10, "Please put atleast 10 birr")
            .required("Amount is required"),
  });

const handleSubmit = async (
  values,
  setSubmitting,
  setErrors,
  mutate,
  type,
  history,
  customers
) => {
  setSubmitting(true);
  const transaction = {
    customer: values.customer._id,
    amount: parseFloat(values.amount),
    type: type,
  };
  const currentBalance = values.customer.accountBalance;
  if (currentBalance < transaction.amount && type === "WITHDRAW") {
    setErrors({ amount: "Account is insufficient" });
    setSubmitting(false);
    return;
  }
  try {
    await mutate({ variables: { transaction } });
    window.location.reload(false);
  } catch (err) {
    setSubmitting(false);
    return;
  }
};

// const findCustomersBalance = (id, customers) => {
//   const customer = customers.find((customer) => customer._id === id);
//   const currentBalance = customer?.accountBalance;
//   return currentBalance;
// };

const TransactionForm = ({ type, customers, history }) => {
  const style = transactionFormStyle();
  const [mutate, { error }] = useMutation(MAKE_TRANSACTION);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema(type)}
      onSubmit={(values, { setSubmitting, setErrors }) =>
        handleSubmit(
          values,
          setSubmitting,
          setErrors,
          mutate,
          type,
          history,
          customers
        )
      }
    >
      {({ isSubmitting, values }) => (
        <Form>
          {console.log(values)}
          {error && <AlertError />}
          <div className={style.root}>
            <div className={style.balanceC}>
              <h2 className={style.currentBalanceText}>Current balance</h2>
              <h3 className={style.viewBalanceC}>
                {values.customer ? (
                  <>
                    <span className={style.amount}>
                      {values.customer.accountBalance.toFixed(2)}
                    </span>
                    <span className={style.currency}>birr</span>
                  </>
                ) : (
                  <span className={style.chooseCustomer}>Choose customer</span>
                )}
              </h3>
            </div>
            <Grid container>
              <Grid item xs={12} md={6} className={style.formItem}>
                <AutocompleteField
                  name="customer"
                  label="Customer"
                  placeholder="Select a customer"
                  data={customers}
                />
                {/* <SelectField
                  data={customers}
                  label="Customer"
                  name="customer"
                /> */}
                {/* <Autocomplete
                  options={customers}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => (values.customer = value)}
                  renderInput={(params) => (
                    <TextField
                      // classes={{
                      //     root: customStyle || style.root
                      // }}
                      {...params}
                      name={"customer"}
                      label={"Customer"}
                      variant={"standard"}
                      placeholder={"Select customer"}
                      // error={meta.error && meta.touched}
                      // helperText={meta.touched && meta.error}
                    />
                  )}
                /> */}
              </Grid>
              {/* <Grid item>
                <Field name="accountBalance">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => {
                    console.log(form);
                    return (
                      <div>
                        <input type="text" placeholder="accountBalance" {...field} />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    );
                  }}
                </Field>
              </Grid> */}
              <Grid item xs={12} md={6} className={style.formItem}>
                <TextField name="amount" type="number" label="Amount" />
              </Grid>
              <Grid item container className={style.submitBtnC}>
                <SubmitButton
                  label={"Create transaction"}
                  isSubmitting={isSubmitting}
                />
              </Grid>
            </Grid>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
