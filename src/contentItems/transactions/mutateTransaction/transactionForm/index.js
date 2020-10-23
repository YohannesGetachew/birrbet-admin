import { useMutation } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { Style, TextFields } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { SubmitButton } from "../../../../components/buttons";
import { AlertError } from "../../../../components/errors";
import { SelectField, TextField } from "../../../../components/fields";
import { MAKE_TRANSACTION } from "../../../../graphql/transaction";
import transactionFormStyle from "./style";

const initialValues = {
  customer: "",
  amount: "",
};

const getValidationSchema = (type, currentBalance) =>
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
            .max(
              currentBalance,
              "Your balance is in sufficient for this withdrawal"
            )
            .required("Amount is required"),
  });

const handleSubmit = async (values, setSubmitting, mutate, type, history) => {
  setSubmitting(true);
  const transaction = {
    customer: values.customer,
    amount: parseFloat(values.amount),
    type: type,
  };
  try {
    await mutate({ variables: { transaction } });
    setSubmitting(false);
    history.push("/admin/transactions");
  } catch (err) {
    setSubmitting(false);
    return;
  }
};

const findCustomersBalance = (id, customers, setCurrentBalance) => {
  const customer = customers.find((customer) => customer._id === id);
  const currentBalance = customer?.accountBalance;
  setCurrentBalance(currentBalance);
  return currentBalance;
};

const TransactionForm = ({ type, customers, history }) => {
  const style = transactionFormStyle();
  const [currentBalance, setCurrentBalance] = useState(false);
  const [mutate, { error }] = useMutation(MAKE_TRANSACTION);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema(type, currentBalance)}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting, mutate, type, history)
      }
    >
      {({ isSubmitting, values }) => (
        <Form>
          {error && <AlertError />}
          <div className={style.root}>
            <div className={style.balanceC}>
              <h2 className={style.currentBalanceText}>Current balance</h2>
              <h3 className={style.viewBalanceC}>
                {values.customer ? (
                  <>
                    <span className={style.amount}>
                      {findCustomersBalance(
                        values.customer,
                        customers,
                        setCurrentBalance
                      )}
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
                <SelectField
                  data={customers}
                  label="Customer"
                  name="customer"
                />
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
