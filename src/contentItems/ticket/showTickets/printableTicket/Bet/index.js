import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { AlertError } from "../../../../../components/errors";
import { useGetFixture } from "../../../../../customHooks/dataFetchers";
import {
  getFormattedDate,
  convertUtcToLocal,
  convertLocalToUtc,
} from "../../../../../utils/date";
import style from "./style";

const useCheckFixturePlaceable = (id) => {
  const { loading, data, error } = useGetFixture({ variables: { id } });
  let isPlaceable = undefined;
  let startDate;
  if (data) {
    if (data.fixture) {
      startDate = data.fixture.startDate;
      const localToUTCNow = convertLocalToUtc(new Date());
      const fixDate = new Date(startDate);
      if (localToUTCNow > fixDate) {
        isPlaceable = false;
      } else {
        isPlaceable = true;
      }
    } else {
      isPlaceable = true;
      startDate = "00/00/00";
    }
  }
  return { loading, startDate, isPlaceable, error };
};

const Bet = ({ bet, setBetStatus }) => {
  const { status } = bet;
  const classes = style();
  const statusInfo = getBetStatusInfo(status, classes);
  const betStatusStyle = statusInfo.style;
  const { loading, startDate, isPlaceable, error } = useCheckFixturePlaceable(
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
  const localFixtueDate = convertUtcToLocal(startDate);
  const formattedLocalFixtureDate = getFormattedDate(localFixtueDate, true);
  return (
    <article
      key={bet._id}
      className={classes.bet + " " + betStatusStyle}
      title={statusInfo.text}
    >
      {isPlaceable === false && <p className={classes.expired}>Bet Expired</p>}
      <p className={classes.betName}>{bet.fixtureName}</p>
      <p className={classes.fixtureDate}>{formattedLocalFixtureDate}</p>
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
      <div className={classes.betDivider}></div>
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
