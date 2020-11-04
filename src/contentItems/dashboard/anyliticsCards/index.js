import React from "react";
import { Grid, useTheme } from "@material-ui/core";
import { TextCard } from "../../../components/cards";
import PropTypes from "prop-types";
import PersonIcon from "@material-ui/icons/Person";
import DollarIcon from "@material-ui/icons/AttachMoney";
import TicketIcon from "@material-ui/icons/ConfirmationNumber";
import HappyIcon from "@material-ui/icons/EmojiEmotions";
import anyliticsCardsStyle from "./style";

const AnyliticsCards = ({ data }) => {
  const style = anyliticsCardsStyle();
  const theme = useTheme();
  const getCardColor = (theme, index) => {
    switch (index) {
      case 10:
        return {
          bgc: theme.palette.primary.dark,
          color: theme.palette.secondary.dark,
        };
      case 20:
        return {
          bgc: theme.palette.secondary.main,
          color: theme.palette.primary.dark,
        };
      case 30:
        return {
          bgc: theme.palette.accentOne.main,
          color: theme.palette.primary.dark,
        };
      case 40:
        return {
          bgc: theme.palette.error.dark,
          color: theme.palette.primary.light,
        };
      default:
        return {
          bgc: theme.palette.primary.dark,
          color: theme.palette.secondary.dark,
        };
    }
  };
  const getCardIcon = (index, classname) => {
    switch (index) {
      case 1:
        return (
          <PersonIcon
            className={classname}
            style={{ color: theme.palette.accentTwo.main }}
          />
        );
      case 2:
        return (
          <DollarIcon
            className={classname}
            style={{ color: theme.palette.success.main }}
          />
        );
      case 3:
        return (
          <TicketIcon
            className={classname}
            style={{ color: theme.palette.error.main }}
          />
        );
      case 4:
        return (
          <HappyIcon
            className={classname}
            style={{ color: theme.palette.primary.dark }}
          />
        );
      default:
        return <DollarIcon className={classname} />;
    }
  };
  return data.map((anyliticsData, index) => (
    <Grid
      key={anyliticsData.title}
      container
      item
      xs={12}
      sm={6}
      md={3}
      lg={6}
      className={style.firstRowFirstColumnItem}
    >
      <TextCard
        anyliticsData={anyliticsData}
        cardColor={(theme) => getCardColor(theme, index + 1)}
        getCardIcon={(classname) => getCardIcon(index + 1, classname)}
      />
    </Grid>
  ));
};
export default AnyliticsCards;

AnyliticsCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ TextCard }.propTypes)),
};
