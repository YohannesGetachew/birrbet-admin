import React from "react";
import ticketAnyliticsStyle from "./style";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
const TicketAnylitics = ({ count, placerType }) => {
  const style = ticketAnyliticsStyle();
  return (
    <div className={style.root}>
      <h3>{placerType} placed today</h3>
      <h5 className={style.count}>
        {" "}
        {placerType === "Cashier" ? count.cashierPlaced : count.onlinePlaced}
      </h5>
      <ConfirmationNumberIcon className={style.ticketIcon} />
    </div>
  );
};

export default TicketAnylitics;
