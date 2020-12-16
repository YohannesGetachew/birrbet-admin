import React from "react";
import ticketAnyliticsStyle from "./style";
import { Grid } from "@material-ui/core";
const PlacedCount = ({ anylitics, placerType, userRole }) => {
  const style = ticketAnyliticsStyle();
  return (
    <div className={style.root}>
      <h3 className={style.title}>
        {userRole === "CASHIER" ? "You placed" : `${placerType} placed`}
      </h3>
      <Grid container>
        <Grid
          item
          xs={6}
          md={12}
          className={style.ticketsC}
          container
          direction="column"
          alignItems="center"
        >
          <Grid className={style.number}>{anylitics.tickets}</Grid>
          <Grid className={style.numberDesc}>Tickets</Grid>
        </Grid>
        <Grid
          item
          xs={6}
          md={12}
          className={style.amountC}
          container
          direction="column"
          alignItems="center"
        >
          <Grid className={style.number}>{anylitics.amount}</Grid>
          <Grid className={style.numberDesc}>ETB</Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlacedCount;
