import React from "react";
import { Grid } from "@material-ui/core";
import { TextCard } from "../../../components/cards";
import PropTypes from "prop-types";
import anyliticsCardsStyle from "./style";

const AnyliticsCards = ({ data }) => {
  const style = anyliticsCardsStyle();
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
      />
    </Grid>
  ));
};
export default AnyliticsCards;

AnyliticsCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ TextCard }.propTypes)),
};
