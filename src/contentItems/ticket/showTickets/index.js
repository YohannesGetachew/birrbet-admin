import React from "react";
import Table from "../../../components/table";
import Example from "../../../components/table/Example";
import ticketColumn from "./tableInfo";
import ticketStyle from "./style";

const Ticket = ({ tickets }) => {
  const style = ticketStyle();
  return (
    <div>
      <Table title="Tickets" columns={ticketColumn} data={tickets} />
      {/* <Example /> */}
    </div>
  );
};

export default Ticket;
