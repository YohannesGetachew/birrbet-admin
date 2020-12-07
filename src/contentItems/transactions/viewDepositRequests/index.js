import { Button, useTheme } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import CustomModal from "../../../components/modal";
import Table from "../../../components/table";
import depositRequestStyle from "./style";
import {
  useConfirmDepositRequest,
  useDeleteDepositRequest,
  useDenyDepositRequest,
} from "../../../customHooks/dataMutators";
import { copyToClipboard } from "../../../utils/clipboard";
import getDepositRequestTableColumns from "./tableInfo";
import { ConfirmActionAlert } from "../../../components/alerts";
import { Form, Formik } from "formik";
import { TextField } from "../../../components/fields";
import * as Yup from "yup";

const ViewDepositRequests = ({ depositRequests }) => {
  const [
    confirmDepositRequest,
    { confirmDepositRequestLoading },
  ] = useConfirmDepositRequest();
  const [
    denyDepositRequest,
    { denyDepositREquestLoading },
  ] = useDenyDepositRequest();
  const [
    deleteDepositRequest,
    { deleteDepositRequestLoading },
  ] = useDeleteDepositRequest();
  const theme = useTheme();

  const [depositEvidence, setDepositEvidence] = useState();
  const [evidenceType, setEvidenceType] = useState();
  const [actionTriggered, setActionTriggered] = useState(false);
  const [seeEvidenceTrigered, setSeeEvidenceTriggered] = useState(false);
  const [actionType, setActionType] = useState();
  const [depositRequestId, setDepositRequestId] = useState();
  const [fullUserName, setFullUserName] = useState();

  const handleActionButtonClick = (
    currentActionType,
    currentId,
    depositingUserName
  ) => {
    setActionType(currentActionType);
    setDepositRequestId(currentId);
    setFullUserName(depositingUserName);
    setActionTriggered(true);
  };

  const viewDepositEvidenceRef = useRef();
  const openModal = () => {
    viewDepositEvidenceRef.current.openModal();
  };

  const confirmActionAlertRef = useRef();
  const openConfirmActionAlertModal = () => {
    confirmActionAlertRef.current.openModal();
  };
  const closeConfirmActionAlertModal = () => {
    confirmActionAlertRef.current.closeModal();
  };

  useEffect(() => {
    if (actionType && depositRequestId && fullUserName) {
      openConfirmActionAlertModal();
    }
    setActionTriggered(false);
  }, [actionType, depositRequestId, fullUserName, actionTriggered]);

  const handleConfirm = async (id, amount) => {
    try {
      await confirmDepositRequest({
        variables: {
          updateDepositRequestInput: { amount },
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeny = async (id) => {
    try {
      await denyDepositRequest({
        variables: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepositRequest({
        variables: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (actionType, id, amount = 0) => {
    switch (actionType) {
      case "CONFIRM":
        return handleConfirm(id, amount);
      case "DENY":
        return handleDeny(id);
      case "DELETE":
        return handleDelete(id);
      default:
        return closeConfirmActionAlertModal();
    }
  };

  const viewEvidence = (evidence, evidenceType) => {
    setSeeEvidenceTriggered(true);
    setDepositEvidence(evidence);
    setEvidenceType(evidenceType);
  };

  useEffect(() => {
    if (depositEvidence && evidenceType) {
      openModal();
    }
    setSeeEvidenceTriggered(false);
  }, [depositEvidence, evidenceType, seeEvidenceTrigered]);

  const columns = getDepositRequestTableColumns(
    theme,
    viewEvidence,
    handleActionButtonClick
  );

  const getSubmitButtonLoading = (actionType) => {
    switch (actionType) {
      case "CONFIRM":
        return confirmDepositRequestLoading;
      case "DENY":
        return denyDepositREquestLoading;
      case "DELETE":
        return deleteDepositRequestLoading;
      default:
        return false;
    }
  };

  const style = depositRequestStyle();
  return (
    <>
      <CustomModal
        ref={viewDepositEvidenceRef}
        contentWidth={{ xs: 11, md: 6 }}
      >
        <div className={style.evidenceModalRoot}>
          {evidenceType === "TRANSACTION_ID" ? (
            <>
              <h4 className={style.evidenceType}>Transaction id</h4>
              <p className={style.transactionId}>{depositEvidence}</p>
              <Button
                variant="contained"
                size="small"
                className={style.copyBtn}
                onClick={() => copyToClipboard(depositEvidence)}
              >
                Copy
              </Button>
            </>
          ) : (
            <>
              <h4 className={style.evidenceType}>Transaction image</h4>
              <img
                src={depositEvidence}
                alt={"deposit evidence"}
                className={style.evidenceImage}
              />
            </>
          )}
        </div>
      </CustomModal>
      <CustomModal ref={confirmActionAlertRef}>
        {actionType === "CONFIRM" && (
          <Formik
            initialValues={{ amount: 0 }}
            validationSchema={Yup.object().shape({
              amount: Yup.number()
                .typeError("Amount must be a number")
                .min(10, "Amount must atleast be than 10 birr")
                .required("Amount is required"),
            })}
            onSubmit={(values) =>
              handleSubmit(actionType, depositRequestId, values.amount)
            }
          >
            {({ values }) => (
              <Form>
                <div className={style.confirmActionModal}>
                  <div className={style.amountField}>
                    <TextField
                      name="amount"
                      label="Enter amount"
                      variant="outlined"
                      size="small"
                      type="number"
                    />
                  </div>
                  <ConfirmActionAlert
                    message={
                      <div className={style.messageC}>
                        Are you sure you want to
                        <span className={style.actionType}> {actionType} </span>
                        for the deposit of
                        <span className={style.actionType}>
                          {values.amount}
                        </span>
                        birr for customer {fullUserName}?
                      </div>
                    }
                    submitLoading={getSubmitButtonLoading(actionType)}
                    submitLabel={"YES"}
                    onCancleClick={closeConfirmActionAlertModal}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )}
        {(actionType === "DENY" || actionType === "DELETE") && (
          <div className={style.confirmActionModal}>
            <ConfirmActionAlert
              message={
                <div className={style.messageC}>
                  Are you sure you want to
                  <span className={style.actionType}> {actionType} </span>
                  this deposit request for customer {fullUserName}?
                </div>
              }
              submitLoading={getSubmitButtonLoading(actionType)}
              submitLabel={"YES"}
              onSubmitClick={() => handleSubmit(actionType, depositRequestId)}
              onCancleClick={closeConfirmActionAlertModal}
            />
          </div>
        )}
      </CustomModal>

      <Table
        columns={columns}
        data={[
          {
            _id: "2",
            evidence: "a",
            evidenceType: "TRANSACTION_ID",
            customer: { firstName: "a", lastName: "b", username: "c" },
          },
        ]}
      />
    </>
  );
};

export default ViewDepositRequests;
