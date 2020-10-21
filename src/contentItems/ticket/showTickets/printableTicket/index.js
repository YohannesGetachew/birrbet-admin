import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import printableTicketStyle from "./style";
import PlaceTicketForm from "./placeTicketForm";
import style from "../../../../components/fields/style";

class PrintableTicket extends React.Component {
  COMPANY_NAME = "BIRR BETS";
  // componentDidUpdate(prevProps, prevState) {
  //     if(prevProps !== this.props){

  //     }
  // }
  calculateReturns = (stake, vatValue, totalOdds) => {
    return (stake * totalOdds - vatValue).toFixed(2);
  };
  render() {
    const {
      placementID,
      ticketID,
      bets,
      stake,
      vatValue,
      totalOdds,
      _id: id,
    } = this.props?.ticket;
    const { classes, actionMode } = this.props;
    console.log(actionMode);
    return (
      <div className={classes.root}>
        <div className={classes.ticketItem}>
          <h1 className={classes.header + " " + classes.alignTextCenter}>
            <span className={classes.logo}>B</span>
          </h1>
          <p className={classes.alignTextCenter + " " + classes.smallText}>
            {actionMode === "PLACE" ? (
              <>
                <span className={classes.boldFont}>Ticket ID:</span>{" "}
                <span className={classes.lightText}>{ticketID}</span>
              </>
            ) : (
              <>
                <span className={classes.boldFont}>Placement ID:</span>
                <span className={classes.lightText}>{placementID}</span>
              </>
            )}
          </p>
          <p
            className={
              classes.alignTextCenter +
              " " +
              classes.smallText +
              " " +
              classes.date
            }
          >
            <span className={classes.boldFont}>Date:</span>{" "}
            <span className={classes.lightText}>
              {new Date().toLocaleDateString("en-GB")}
            </span>
          </p>
          {bets.map((bet) => (
            <article key={bet._id} className="ticket-item_bet">
              <p className={classes.betName}>{bet.fixtureName}</p>
              <span className={classes.betDetails + " " + classes.lightText}>
                {bet.type}
              </span>
              <span className={classes.betDetails + " " + classes.lightText}>
                {bet.value}
              </span>
              <span className={classes.betDetails + " " + classes.lightText}>
                {bet.oddValue}
              </span>
              <hr />
            </article>
          ))}
          {actionMode === "PRINT" ? (
            <Grid container className={classes.summary}>
              <Grid item xs={6} md={4}>
                <p className={classes.smallText}>
                  <span className={classes.boldFont}>Bet Amt:</span>
                  <span className={classes.lightText}>{stake}</span>
                </p>
                <p className={classes.smallText}>
                  <span className={classes.boldFont}>Vat(15%): </span>
                  <span className={classes.lightText}>{vatValue}</span>
                </p>
                <p className={classes.smallText}>
                  <span className={classes.boldFont}>Est Return : </span>
                  <span className={classes.lightText}>
                    {this.calculateReturns(stake, vatValue, totalOdds)}
                  </span>
                </p>
              </Grid>
            </Grid>
          ) : (
            <PlaceTicketForm
              initialStake={stake}
              ticketID={id}
              totalOdds={totalOdds}
              calculateReturns={this.calculateReturns}
            />
          )}

          {actionMode === "PRINT" && (
            <>
              <hr />
              <div className={classes.terms + " " + classes.alignTextCenter}>
                Terms and conditions apply as set by {this.COMPANY_NAME}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(printableTicketStyle)(PrintableTicket);
