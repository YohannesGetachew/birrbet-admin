import { Grid, useTheme } from "@material-ui/core";
import React from "react";
import { LineGraphCard, DoghnutGraphCard } from "../../components/cards";
import FavoriteFixture from "./FavoriteFixture";
import AnyliticsCards from "./anyliticsCards";
import dashboardStyle from "./style";

const Dashboard = () => {
  const theme = useTheme();
  const style = dashboardStyle();
  const anyliticsCardsData = [
    {
      analytics: { direction: "decrease", number: "7%" },
      title: "Customers",
      body: "43,345",
      analyticsStartDate: "All time",
    },
    {
      analytics: { direction: "increase", number: "13.2%" },
      title: "Total income",
      body: "431,345",
      analyticsStartDate: "All time",
    },
    {
      analytics: { direction: "increase", number: "7%" },
      title: "Total bets",
      body: "43,345",
      analyticsStartDate: "All time",
    },
    {
      analytics: { direction: "decrease", number: "2%" },
      title: "Tickets placed",
      body: "10",
      analyticsStartDate: "Today",
    },
  ];
  const lineGraphData = {
    labels: ["10-23-12", "11-23-12", "12-23-12"],
    datasets: [
      {
        label: "Deposits",
        data: [10, 50, 40, 20],
        backgroundColor: ["transparent"],
        borderColor: [theme.palette.error.main],
      },
      {
        label: "Withdrawals",
        data: [45, 30, 10, 40],
        backgroundColor: ["transparent"],
        borderColor: [theme.palette.accentTwo.main],
      },
    ],
  };
  const doghhnutData = {
    labels: ["Basketball", "Rugby", "Soccer", "Golf"],
    datasets: [
      {
        label: "Deposits",
        data: [10, 50, 40, 20],
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
