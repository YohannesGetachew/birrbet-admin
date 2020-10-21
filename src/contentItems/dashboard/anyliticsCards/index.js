import React from "react";
import { Grid } from "@material-ui/core";
import { TextCard } from "../../../components/cards";
import PropTypes from "prop-types";
import anyliticsCardsStyle from "./style";

const AnyliticsCards = ({ data }) => {
  const style = anyliticsCardsStyle();
  return data.map((anyliticsData) => (
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
      <TextCard anyliticsData={anyliticsData} />
    </Grid>
  ));
};
export default AnyliticsCards;

AnyliticsCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ TextCard }.propTypes)),
};
