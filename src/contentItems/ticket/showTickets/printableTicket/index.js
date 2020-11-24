import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import printableTicketStyle from "./style";
import PlaceTicketForm from "./placeTicketForm";
import { calculateTicketReturns } from "../ticketCalculation";
import logo from "./birrBetPrint.png";
import { getFormattedDate } from "../../../../utils/date";

class PrintableTicket extends React.Component {
  COMPANY_NAME = "BIRR BET";

  render() {
    const {
      placementID,
      ticketID,
      bets,
      stake,
      totalOdds,
      _id: id,
    } = this.props?.ticket;
    const { classes, actionMode } = this.props;
    console.log(actionMode);
    return (
      <div className={classes.root}>
        <div className={classes.ticketItem}>
          <h1 className={classes.header + " " + classes.alignTextCenter}>
            <img src={logo} alt="Birr bet" className={classes.logo} />
          </h1>
          <p
            className={
              classes.alignTextCenter +
              " " +
              classes.smallText +
              " " +
              classes.bMargin
            }
          >
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
              classes.bMargin
            }
          >
            <span className={classes.boldFont}>Date:</span>{" "}
            <span className={classes.lightText}>
              {getFormattedDate(new Date())}
            </span>
          </p>
          <p
            className={
              classes.alignTextCenter +
              " " +
              classes.smallText +
              " " +
              classes.bMargin
            }
          >
            <span className={classes.boldFont}>Phone number:</span>
            <span className={classes.lightText}>0966415868</span>
          </p>
          <p
            className={
              classes.alignTextCenter +
              " " +
              classes.smallText +
              " " +
              classes.bMargin
            }
          >
            <span className={classes.boldFont}>Branch:</span>
            <span className={classes.lightText}>22</span>
          </p>
          <div className={classes.padding}>
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
            <Grid container className={classes.summary}>
              {actionMode === "PRINT" || actionMode === "VIEW" ? (
                <Grid item>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Stake:</span>
                    <span className={classes.lightText}>{stake}</span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Vat: </span>
                    <span className={classes.lightText}>
                      {calculateTicketReturns(stake, totalOdds).vatOnStake}
                    </span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Stake after vat:</span>
                    <span className={classes.lightText}>
                      {calculateTicketReturns(stake, totalOdds).stakeAfterVat}
                    </span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Total odds:</span>
                    <span className={classes.lightText}>
                      {totalOdds.toFixed(2)}
                    </span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Total bets:</span>
                    <span className={classes.lightText}>{bets.length}</span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Income tax: </span>
                    <span className={classes.lightText}>
                      {calculateTicketReturns(stake, totalOdds).incomeTax}
                    </span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Possible win : </span>
                    <span className={classes.lightText}>
                      {calculateTicketReturns(stake, totalOdds).possibleWin}
                    </span>
                  </p>
                </Grid>
              ) : (
                <PlaceTicketForm
                  initialStake={stake}
                  ticketID={id}
                  totalOdds={totalOdds}
                  totalBets={bets.length}
                />
              )}
            </Grid>
          </div>
          {actionMode === "PRINT" && (
            <div className={classes.padding}>
              <hr />
              <div className={classes.terms + " " + classes.alignTextCenter}>
                Terms and conditions apply as set by {this.COMPANY_NAME}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(printableTicketStyle)(PrintableTicket);
