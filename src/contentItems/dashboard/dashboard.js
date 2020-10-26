import { Grid, useTheme } from "@material-ui/core";
import React from "react";
import { LineGraphCard, DoghnutGraphCard } from "../../components/cards";
import FavoriteFixture from "./FavoriteFixture";
import AnyliticsCards from "./anyliticsCards";
import dashboardStyle from "./style";

const Dashboard = ({ anyliticsCardsData, lineGraphData }) => {
  const theme = useTheme();
  const style = dashboardStyle();

  const doghhnutData = {
    labels: ["Premier league", "Champions league", "La liga"],
    datasets: [
      {
        label: "Top leagues",
        data: [50, 40, 20],
        backgroundColor: [
          theme.palette.secondary.main,
          theme.palette.warning.light,
          theme.palette.primary.light,
          theme.palette.accentTwo.dark,
        ],
        borderColor: ["#ffffff"],
      },
    ],
  };

  return (
    <div className={style.root}>
      <Grid container className={style.firstRow}>
        <Grid
          item
          container
          lg={4}
          md={12}
          xs={12}
          className={style.firstRowFirstColumn}
        >
          <AnyliticsCards data={anyliticsCardsData} />
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={12}
          lg={8}
          className={style.firstRowSecondColumn}
        >
          <LineGraphCard data={lineGraphData} />
        </Grid>
      </Grid>
      <Grid container className={style.secondRow}>
        <Grid item className={style.secondRowFirstColumn} xs={12} md={8}>
          <FavoriteFixture />
        </Grid>
        <Grid item className={style.secondRowSecondColumn} xs={12} md={4}>
          <DoghnutGraphCard data={doghhnutData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
