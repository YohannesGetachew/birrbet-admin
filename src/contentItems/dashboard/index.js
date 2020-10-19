import { Grid } from "@material-ui/core";
import React from "react";
import { TextCard, LineGraphCard, BarGraphCard } from "../../components/cards";
import FavoriteFixture from "./FavoriteFixture";
import dashboardStyle from "./style";

const Dashboard = () => {
  const style = dashboardStyle();
  return (
    <div className={style.root}>
      <Grid container className={style.firstRow}>
        <Grid
          item
          container
          lg={5}
          md={12}
          xs={12}
          className={style.firstRowFirstColumn}
        >
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            className={style.firstRowFirstColumnItem}
          >
            <TextCard
              analytics={{ direction: "decrease", number: "7%" }}
              title="Customers"
              body="43,345"
              analyticsStartDate="All time"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            className={style.firstRowFirstColumnItem}
          >
            <TextCard
              analytics={{ direction: "increase", number: "10.2%" }}
              title="Total income"
              body="433,345"
              analyticsStartDate="All time"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            className={style.firstRowFirstColumnItem}
          >
            <TextCard
              analytics={{ direction: "increase", number: "7%" }}
              title="Total Bets"
              body="76,456"
              analyticsStartDate="All time"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={3}
            lg={6}
            className={style.firstRowFirstColumnItem}
          >
            <TextCard
              analytics={{ direction: "decrease", number: "7%" }}
              title="Tickets placed"
              body="40"
              analyticsStartDate="today"
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={12}
          lg={7}
          className={style.firstRowSecondColumn}
        >
          <LineGraphCard />
        </Grid>
        <Grid container className={style.secondRow}>
          <Grid item className={style.secondRowFirstColumn} xs={12} md={8}>
            <FavoriteFixture />
          </Grid>
          <Grid item className={style.secondRowSecondColumn} xs={12} md={4}>
            <BarGraphCard />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
