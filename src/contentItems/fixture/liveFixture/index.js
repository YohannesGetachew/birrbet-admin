import React, { useState } from "react";
import style from "./style";
import Odds from "./odds";
import { Button, Grid } from "@material-ui/core";

const LiveFixture = ({ fixture, liveScore, liveOdd }) => {
  const [more, setMore] = useState(false);
  const { participants, odds, basicOdds, id } = fixture;
  let participantNames = participants.map((participant) => participant.name);
  participantNames =
    participantNames.length === 2
      ? participantNames.join(" vs ")
      : participantNames.join(" ");

  const doesLiveOddBelongToFixture = id === liveOdd.fixtureId;

  const classes = style({ updated: doesLiveOddBelongToFixture });

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <h4 className={classes.fixtureName}>{participantNames}</h4>
        <Button onClick={() => setMore(!more)}>{more ? "LESS" : "MORE"}</Button>
      </Grid>
      {!more && (
        <Odds
          odds={basicOdds.odds}
          liveOdd={doesLiveOddBelongToFixture ? liveOdd : null}
        />
      )}
      {more && (
        <Odds
          odds={odds}
          liveOdd={doesLiveOddBelongToFixture ? liveOdd : null}
        />
      )}
    </div>
  );
};

export default LiveFixture;
