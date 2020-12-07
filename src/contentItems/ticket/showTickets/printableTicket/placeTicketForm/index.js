import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { TextField } from "../../../../../components/fields/index";
import { UPDATE_TICKET } from "../../../../../graphql/ticket";
import { SubmitButton } from "../../../../../components/buttons";
import * as Yup from "yup";
import { calculateTicketReturns } from "../../../../../utils/ticketCalculation";
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
    popupError(err);
  }
};

const getValidationSchema = (minStake, maxStake, maxWin) =>
  Yup.object().shape({
    stake: Yup.number()
      .typeError("Stake must be a number")
      .integer("Stake must be an integer")
      .min(minStake, `Stake must be at least ${minStake} birr`)
      .max(maxStake, `Stake must not be greater than ${maxStake}`)
      .required("Stake is required"),
  });

const PlaceTicketForm = ({
  initialStake,
  ticketID,
  totalOdds,
  totalBets,
  history,
  app,
}) => {
  const [mutate, { error }] = useMutation(UPDATE_TICKET);
  const style = placeTicketFormStyle();
  return (
    <Formik
      initialValues={{ stake: initialStake }}
      validationSchema={getValidationSchema(
        app.minStake,
        app.maxStake,
        app.maxWin
      )}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting, mutate, ticketID, history)
      }
    >
      {({ isSubmitting, values }) => {
        const { stake } = values;
        const {
          vatOnStake,
          possibleWin,
          incomeTax,
          stakeAfterVat,
          roundedTotalOdds,
        } = calculateTicketReturns(stake, totalOdds, app.maxWin);

        return (
          <Form>
            {error && <AlertError />}
            <TextField
              label="Stake"
              name="stake"
              placeholder="Stake"
              className={`${style.paddingBottom} ${style.textField}`}
            />
            <p className={style.paddingBottom + " " + style.smallText}>
              <span className={style.boldLabel}>Vat:</span>
              {vatOnStake} ETB
            </p>
            <p className={style.paddingBottom + " " + style.smallText}>
              <span className={style.boldLabel}>Stake after vat:</span>
              {stakeAfterVat} ETB
            </p>
            <p className={style.paddingBottom + " " + style.smallText}>
              <span className={style.boldLabel}>Total odds:</span>
              {roundedTotalOdds}
            </p>
            <p className={style.paddingBottom + " " + style.smallText}>
              <span className={style.boldLabel}>Total bets:</span>
              {totalBets}
            </p>
            <p className={style.paddingBottom + " " + style.smallText}>
              <span className={style.boldLabel}>Income tax:</span>
              {incomeTax} ETB
            </p>
            <p className={style.paddingBottom + " " + style.smallText}>
              <span className={style.boldLabel}>Possible win:</span>
              {possibleWin} ETB
            </p>
            <SubmitButton isSubmitting={isSubmitting} label="PLACE" />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PlaceTicketForm;
