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

const ViewDepositRequests = ({ depositRequests }) => {
  const [confirmDepositRequest] = useConfirmDepositRequest();
  const [denyDepositRequest] = useDenyDepositRequest();
  const [deleteDepositRequest] = useDeleteDepositRequest();
  const theme = useTheme();

  const [depositEvidence, setDepositEvidence] = useState();
  const [evidenceType, setEvidenceType] = useState();
  const [actionTriggered, setActionTriggered] = useState(false);

  const viewDepositEvidenceRef = useRef();
  const openModal = () => {
    viewDepositEvidenceRef.current.openModal();
  };

  const handleDepositRequestConfirm = async (id, amount) => {
    try {
      const data = await confirmDepositRequest({
        variables: {
          updateDepositRequestInput: { amount },
          id,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDepositRequestDeny = async (id) => {
    try {
      const data = await denyDepositRequest({
        variables: {
          id,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDepositRequestDelete = async (id) => {
    try {
      const data = await deleteDepositRequest({
        variables: {
          id,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const viewEvidence = (evidence, evidenceType) => {
    setActionTriggered(true);
    setDepositEvidence(evidence);
    setEvidenceType(evidenceType);
  };

  useEffect(() => {
    if (depositEvidence && evidenceType) {
      openModal();
    }
    setActionTriggered(false);
  }, [depositEvidence, evidenceType, actionTriggered]);

  const columns = getDepositRequestTableColumns(theme, viewEvidence);

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
      <Table columns={columns} data={depositRequests} />
    </>
  );
};

export default ViewDepositRequests;
