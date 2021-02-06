import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ConfirmActionAlert } from "../../../../components/alerts";
import CustomModal from "../../../../components/modal";
import { useMutation } from "@apollo/client";
import { DUPLICATE_TICKET } from "../../../../graphql/ticket";
import { AlertError } from "../../../../components/errors";
import { useEffect } from "react";
import style from "./style";
import { TextField } from "../../../../components/fields";
import { Button } from "@material-ui/core";
import { copyToClipboard } from "../../../../utils/clipboard";
import { CancelButton } from "../../../../components/buttons";

const handleTicketDuplicate = async (ticketId, stake, mutate) => {
  try {
    await mutate({
      variables: { id: ticketId, stake: parseFloat(stake) },
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

const DuplicateTicket = ({
  ticket,
  actionMode,
  app,
  setActionTriggered,
  actionTriggered,
}) => {
  const [mutate, { error, loading, data }] = useMutation(DUPLICATE_TICKET);
  const duplicateTicketModalRef = useRef();
  const openDuplicateModal = () => {
    duplicateTicketModalRef.current.openModal();
  };
  const closeDuplicateModal = () => {
    duplicateTicketModalRef.current.closeModal();
  };

  const handleCopyClick = (action) => {
    action();
    window.location.reload(false);
  };

  useEffect(() => {
    if (ticket && actionMode === "DUPLICATE") {
      openDuplicateModal();
    }
    setActionTriggered(false);
  }, [ticket, actionMode, setActionTriggered, actionTriggered]);

  const initialValue = { stake: ticket?.stake };

  const classes = style();
  return (
    <CustomModal ref={duplicateTicketModalRef}>
      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          stake: Yup.number()
            .typeError("Stake must be a number")
            .min(10, `Stake must atleast be ${app.minStake} birr`)
            .required("Stake is required"),
        })}
        onSubmit={(values) =>
          handleTicketDuplicate(ticket._id, values.stake, mutate)
        }
      >
        {({ values }) => (
          <Form>
            <div className={classes.modalRoot}>
              {!data ? (
                <>
                  <div>{error && <AlertError />}</div>
                  <div>
                    <TextField name="stake" label="Stake" variant="outlined" />
                  </div>
                  <ConfirmActionAlert
                    message={
                      <h4>
                        Are you sure you want to duplicate this ticket
                        (Placement ID: <u>{ticket?.placementID}</u>)?
                      </h4>
                    }
                    submitLoading={loading}
                    submitLabel={"YES"}
                    onCancleClick={closeDuplicateModal}
                  />
                </>
              ) : (
                <>
                  <h4>
                    {" "}
                    The new ticket's Placement ID is{" "}
                    <u>{data?.duplicateTicket?.placementID}</u>
                  </h4>
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.copyBtn}
                    onClick={() =>
                      handleCopyClick(() =>
                        copyToClipboard(data?.duplicateTicket?.placementID)
                      )
                    }
                  >
                    Copy
                  </Button>
                  {/* <CancelButton
                    label="close"
                    onClick={handleCopyClick(closeDuplicateModal)}
                  /> */}
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default DuplicateTicket;
