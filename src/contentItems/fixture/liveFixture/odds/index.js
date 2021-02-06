import { Grid } from "@material-ui/core";
import React from "react";
import style from "./style";

export default ({ odds, liveOdd }) => {
  const classes = style();
  return odds.length
    ? odds.map((odd) => {
        return (
          <div key={odd.marketId}>
            <h5 xs={12} className={classes.market}>
              {odd?.market?.name}
            </h5>
            <Grid container className={classes.betC}>
              {odd.bets.map((bet) => {
                if (liveOdd) {
                  if (odd.marketId === liveOdd.marketId) {
                    const liveBet = liveOdd.bets.find(
                      (liveBet) => liveBet.id === bet.id
                    );
                    if (liveBet) {
                      bet = {
                        ...liveBet,
                        increase: liveBet.price >= bet.price,
                        decrease: liveBet.price <= bet.price,
                      };
                    }
                  }
                }
                return (
                  <Grid
                    key={bet.id}
                    container
                    item
                    className={`${classes.bet} ${
                      bet.increase && classes.increase
                    } ${bet.decrease && classes.decrease} ${
                      odd.bets.length > 6 && classes.wideBet
                    }`}
                  >
                    <span>{bet.name}</span>
                    <span>{bet.price}</span>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        );
      })
    : null;
};
