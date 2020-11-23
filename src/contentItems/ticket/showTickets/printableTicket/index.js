import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import printableTicketStyle from "./style";
import PlaceTicketForm from "./placeTicketForm";
import { calculateTicketReturns } from "../helper";
import logo from "../../../../assets/logo.png";
import style from "./style";

class PrintableTicket extends React.Component {
  COMPANY_NAME = "BIRR BETS";
  // componentDidUpdate(prevProps, prevState) {
  //     if(prevProps !== this.props){

  //     }
  // }

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
            <img src={logo} alt="Birr bet" className={classes.logo} />
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
          <div className={classes.lrPadding}>
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
                <Grid item className={classes.summarySecondRow}>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Bet Amt:</span>
                    <span className={classes.lightText}>{stake}</span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Vat(15%): </span>
                    <span className={classes.lightText}>
                      {
                        calculateTicketReturns(stake, stake * 0.15, totalOdds)
                          .comission
                      }
                    </span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Est Return : </span>
                    <span className={classes.lightText}>
                      {
                        calculateTicketReturns(stake, stake * 0.15, totalOdds)
                          .estimatedReturns
                      }
                    </span>
                  </p>
                </Grid>
              </Grid>
            ) : (
              <PlaceTicketForm
                initialStake={stake}
                ticketID={id}
                totalOdds={totalOdds}
                calculateReturns={calculateTicketReturns}
              />
            )}
          </div>
          {actionMode === "PRINT" && (
            <div style={{ padding: "0 30px 0 30px" }}>
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
