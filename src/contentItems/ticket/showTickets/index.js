import React, { useEffect, useRef, useState } from "react";
import Table from "../../../components/table";
import getTicketColumn from "./tableInfo";
import ticketStyle from "./style";
import { Button, useTheme } from "@material-ui/core";
import CustomModal from "../../../components/modal";
import PrintableTicket from "./printableTicket";
import { useReactToPrint } from "react-to-print";

const Ticket = ({ tickets }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [currentTicketID, setCurrentTicketID] = useState(null);
  // const [actionTriggered, setActionTriggered] = useState(false);
  const currentTicket = tickets.find(
    (ticket) => ticket._id === currentTicketID
  );
  const [actionTriggered, setActionTriggered] = useState(false);
  const [actionMode, setActionMode] = useState(null);
  const placeTicketModalRef = useRef();
  const theme = useTheme();
  const openModal = () => {
    placeTicketModalRef.current.openModal();
  };
  const prepareTicketPlacement = (ticket, currentActionMode) => {
    setActionTriggered(true);
    setCurrentTicketID(ticket);
    setActionMode(currentActionMode);
  };
  useEffect(() => {
    if (currentTicket) {
      openModal();
    }
    setActionTriggered(false);
  }, [currentTicket, actionTriggered]);
  const ticketColumn = getTicketColumn(theme, prepareTicketPlacement);
  const style = ticketStyle();
  return (
    <div>
      <CustomModal ref={placeTicketModalRef}>
        {currentTicket && (
          <div className={style.modalContent}>
            <PrintableTicket
              ticket={currentTicket}
              actionMode={actionMode}
              ref={componentRef}
            />
            {actionMode === "PRINT" && (
              <div className={style.actionsC}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handlePrint}
                  className={style.printBtn}
                >
                  PRINT
                </Button>
              </div>
            )}
          </div>
        )}
      </CustomModal>
      <Table columns={ticketColumn} data={tickets} />
    </div>
  );
};

export default Ticket;
