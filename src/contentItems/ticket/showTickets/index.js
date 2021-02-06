import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "../../../components/table";
import getTicketColumn from "./tableInfo";
import ticketStyle from "./style";
import { Button, useTheme } from "@material-ui/core";
import CustomModal from "../../../components/modal";
import PrintableTicket from "./printableTicket";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../contexts/auth";
import DuplicateTicket from "./duplicateTicket";

const Ticket = ({ tickets, app }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { authData } = useContext(AuthContext);
  const [currentTicketID, setCurrentTicketID] = useState(null);
  // const [actionTriggered, setActionTriggered] = useState(false);
  const currentTicket = tickets.find(
    (ticket) => ticket._id === currentTicketID
  );

  const [actionTriggered, setActionTriggered] = useState(false);
  const [actionMode, setActionMode] = useState(null);

  const placeTicketModalRef = useRef();
  const openModal = () => {
    placeTicketModalRef.current.openModal();
  };

  const theme = useTheme();

  const prepareTicketPlacement = (ticket, currentActionMode) => {
    setActionTriggered(true);
    setCurrentTicketID(ticket);
    setActionMode(currentActionMode);
  };

  useEffect(() => {
    if (currentTicket && actionMode !== "DUPLICATE") {
      openModal();
    }
    setActionTriggered(false);
  }, [currentTicket, actionTriggered, actionMode]);

  const style = ticketStyle();
  const ticketColumn = getTicketColumn(
    theme,
    prepareTicketPlacement,
    app.maxWin,
    authData.userData.role
  );
  return (
    <div>
      <CustomModal ref={placeTicketModalRef}>
        {currentTicket && (
          <div className={style.modalContent}>
            <PrintableTicket
              ticket={currentTicket}
              app={app}
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
      <DuplicateTicket
        app={app}
        ticket={currentTicket}
        actionMode={actionMode}
        setActionTriggered={setActionTriggered}
        actionTriggered={actionTriggered}
      />
      <Table columns={ticketColumn} data={tickets} />
    </div>
  );
};

export default Ticket;
