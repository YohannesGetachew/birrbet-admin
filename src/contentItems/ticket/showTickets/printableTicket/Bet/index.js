import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { AlertError } from "../../../../../components/errors";
import { useGetFixture } from "../../../../../customHooks/dataFetchers";
import { getFormattedDate } from "../../../../../utils/date";
import style from "./style";

const useCheckFixturePlaceable = (id) => {
  const { loading, data, error } = useGetFixture({ variables: { id } });
  let isPlaceable = undefined;
  if (data) {
    const d = new Date().setMinutes(
      new Date().getMinutes() + new Date().getTimezoneOffset()
    );
    const now = new Date(d);
    const fixDate = new Date(data.fixture.startDate);
    if (now > fixDate) {
      isPlaceable = false;
    } else {
      isPlaceable = true;
    }
  }
  return { loading, data, isPlaceable, error };
};

const Bet = ({ bet, setBetStatus }) => {
  const { status } = bet;
  const classes = style();
  const statusInfo = getBetStatusInfo(status, classes);
  const betStatusStyle = statusInfo.style;
  const { loading, data, isPlaceable, error } = useCheckFixturePlaceable(
    bet.fixtureId
  );
  useEffect(() => {
    if (typeof isPlaceable === "boolean") {
      setBetStatus({ id: bet._id, isPlaceable });
    }
  }, [isPlaceable]);
  if (loading) {
    return <Skeleton width={"100%"} height="80px" />;
  }
  if (error) {
    return <AlertError />;
  }
  // const betStartDate = getFormattedDate(data.fixture.startDate, true);
  // console.log(bet.fixtureName, betStartDate);
  return (
    <article
      key={bet._id}
      className={classes.bet + " " + betStatusStyle}
      title={statusInfo.text}
    >
      {isPlaceable === false && (
        <p className={classes.expired}>Match started</p>
      )}
      <p className={classes.betName}>{bet.fixtureName}</p>
      {/* <p className={classes.betName}>{betStartDate}</p> */}
      <Grid container justify="space-between">
        <span className={classes.betDetails + " " + classes.lightText}>
          {bet.type}
        </span>
        <span className={classes.betDetails + " " + classes.lightText}>
          {bet.value}
        </span>
        <span className={classes.betDetails + " " + classes.lightText}>
          {bet.oddValue}
        </span>
      </Grid>
      <hr />
    </article>
  );
};

export default Bet;

const getBetStatusInfo = (status, classes) => {
  switch (status) {
    case -1:
      return { style: classes.cancelled, text: "CANCELLED" };
    case 1:
      return { style: classes.loser, text: "LOSE" };
    case 2:
      return { style: classes.winner, text: "WIN" };
    case 3:
      return { style: classes.refund, text: "REFUND" };
    case 4:
      return { style: classes.halfLost, text: "HALF LOST" };
    case 5:
      return { style: classes.halfWon, text: "HALF WON" };
    case null:
      return { style: classes.pending, text: "PENDING" };
    default:
      return { style: classes.pending, text: "UNKNOWN" };
  }
};
