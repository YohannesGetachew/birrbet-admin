import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import Barcode from "react-barcode";
import printableTicketStyle from "./style";
import PlaceTicketForm from "./placeTicketForm";
import { calculateTicketReturns } from "../../../../utils/ticketCalculation";
import logo from "./birrBetTicketPrint.png";
import { getFormattedDate } from "../../../../utils/date";
import Bet from "./Bet";

class PrintableTicket extends React.Component {
  state = {
    betsPlacableStatus: [],
  };

  COMPANY_NAME = "BIRR BET";

  checkTicketPlaceable = (betsCount) => {
    const { betsPlacableStatus } = this.state;
    const areAllBetsPlaceable = betsPlacableStatus.reduce((prev, cur) => {
      return prev && cur.isPlaceable;
    }, true);
    return betsPlacableStatus.length === betsCount && areAllBetsPlaceable;
  };

  render() {
    const {
      placementID,
      ticketID,
      bets,
      stake,
      totalOdds,
      placerType,
      user,
      isPlaced,
      placedDate,
      _id: id,
    } = this.props?.ticket;
    const { maxWin } = this.props?.app;
    const { classes, actionMode } = this.props;
    const {
      stakeAfterVat,
      vatOnStake,
      roundedTotalOdds,
      incomeTax,
      possibleWin,
    } = calculateTicketReturns(stake, totalOdds, maxWin);
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
                <div className={classes.alignTextCenter}>
                  <Barcode
                    value={placementID}
                    displayValue={false}
                    height={50}
                  />
                </div>
                <div
                  className={classes.alignTextCenter + " " + classes.bMargin}
                >
                  <span className={classes.boldFont}>Placement ID:</span>
                  <span className={classes.lightText}>
                    {placementID ? placementID : "Not placed"}
                  </span>
                </div>
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
            <span className={classes.boldFont}>Date:</span>
            <span className={classes.lightText}>
              {isPlaced
                ? getFormattedDate(placedDate, true)
                : getFormattedDate(new Date(), true)}
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
            <span className={classes.boldFont}>
              {placerType === "CASHIER" ? "Cashier:" : "Customer:"}
            </span>
            <span className={classes.lightText}>
              {placerType === "CUSTOMER" || placerType === "CASHIER"
                ? `${user.firstName} ${user.lastName}`
                : "Not placed"}
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
            <span className={classes.lightText}>0966415859</span>
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
            {bets.map((bet) => {
              return (
                <Bet
                  bet={bet}
                  key={bet._id}
                  setBetStatus={(status) =>
                    this.setState((prevState) => ({
                      betsPlacableStatus: [
                        ...prevState.betsPlacableStatus,
                        status,
                      ],
                    }))
                  }
                />
              );
            })}
            <Grid container className={classes.summary}>
              {actionMode === "PRINT" || actionMode === "VIEW" ? (
                <Grid item>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Stake:</span>
                    <span className={classes.lightText}>{stake} ETB</span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Vat: </span>
                    <span className={classes.lightText}>{vatOnStake} ETB</span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Stake after vat:</span>
                    <span className={classes.lightText}>
                      {stakeAfterVat} ETB
                    </span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Total odds:</span>
                    <span className={classes.lightText}>
                      {roundedTotalOdds}
                    </span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Total bets:</span>
                    <span className={classes.lightText}>{bets.length}</span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Income tax: </span>
                    <span className={classes.lightText}>{incomeTax} ETB</span>
                  </p>
                  <p className={classes.smallText + " " + classes.bMargin}>
                    <span className={classes.boldFont}>Possible win : </span>
                    <span className={classes.lightText}>{possibleWin} ETB</span>
                  </p>
                </Grid>
              ) : (
                <PlaceTicketForm
                  initialStake={stake}
                  ticketID={id}
                  totalOdds={totalOdds}
                  totalBets={bets.length}
                  app={this.props.app}
                  placeable={this.checkTicketPlaceable(bets.length)}
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
