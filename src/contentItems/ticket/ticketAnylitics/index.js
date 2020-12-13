import React from "react";
import ticketAnyliticsStyle from "./style";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
const PlacedCount = ({ count, placerType }) => {
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

const TodaysStake = ({ count }) => {
  const style = ticketAnyliticsStyle({ stakeCard: true });
  return (
    <div className={style.root}>
      <h3>Today's stake</h3>
      <h5 className={style.count}>
        {" "}
        {count} <span className={style.currency}>ETB</span>
      </h5>
    </div>
  );
};

export { PlacedCount, TodaysStake };
