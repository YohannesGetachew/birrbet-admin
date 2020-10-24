import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { TextField } from "../../../../../components/fields/index";
import { UPDATE_TICKET } from "../../../../../graphql/ticket";
import { SubmitButton } from "../../../../../components/buttons";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import placeTicketFormStyle from "./style";
import { AlertError, popupError } from "../../../../../components/errors";

const handleSubmit = async (
  values,
  setSubmitting,
  mutate,
  ticketID,
  history
) => {
  setSubmitting(true);

  try {
    await mutate({
      variables: {
        updateInput: { stake: parseFloat(values.stake) },
        id: ticketID,
      },
    });
    setSubmitting(false);
    window.location.reload(false);
  } catch (err) {
    console.log(err);
    popupError("Ticket has expired");
  }
};

const validationSchema = Yup.object().shape({
  stake: Yup.number()
    .typeError("Stake must be a number")
    .integer("Stake must be an integer")
    .min(30, "Stake must be at least 30 birr")
    .required("Stake is required"),
});

const PlaceTicketForm = ({
  initialStake,
  ticketID,
  totalOdds,
  calculateReturns,
  history,
}) => {
  const [mutate, { error }] = useMutation(UPDATE_TICKET);
  const style = placeTicketFormStyle();
  return (
    <Formik
      initialValues={{ stake: initialStake }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting, mutate, ticketID, history)
      }
    >
      {({ isSubmitting, values }) => {
        const { stake } = values;
        const vatValue = (stake * 15) / 100;
        const returns = calculateReturns(stake, vatValue, totalOdds);
        return (
          <Form>
            {error && <AlertError />}
            <Grid container justify="flex-end">
              <Grid item xs={8} md={4}>
                <TextField
                  label="Stake"
                  name="stake"
                  placeholder="Stake"
                  className={`${style.paddingBottom} ${style.textField}`}
                />
                <p className={style.paddingBottom + " " + style.smallText}>
                  <span className={style.boldLabel}>Vat(15%):</span>
                  {vatValue}
                </p>
                <p className={style.paddingBottom + " " + style.smallText}>
                  <span className={style.boldLabel}>Est.return:</span>
                  {returns}
                </p>
                <SubmitButton isSubmitting={isSubmitting} label="PLACE" />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PlaceTicketForm;
