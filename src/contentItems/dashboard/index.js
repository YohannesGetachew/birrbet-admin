import { Grid } from "@material-ui/core";
import React from "react";
import { TextCard, LineGraphCard } from "../../components/cards";
import dashboardStyle from "./style";

const Dashboard = () => {
  const style = dashboardStyle();
  return (
    <div>
      <Grid container className={style.firstRow}>
        <Grid
          item
          container
          lg={4}
          md={8}
          sm={8}
          xs={12}
          className={style.firstRowFirstColumn}
        >
          <Grid container item xs={6} className={style.firstRowFirstColumnItem}>
            <TextCard analytics={{ direction: "decrease" }} />
          </Grid>
          <Grid container item xs={6} className={style.firstRowFirstColumnItem}>
            <TextCard analytics={{ direction: "decrease" }} />
          </Grid>
          <Grid container item xs={6} className={style.firstRowFirstColumnItem}>
            <TextCard analytics={{ direction: "decrease" }} />
          </Grid>
          <Grid container item xs={6} className={style.firstRowFirstColumnItem}>
            <TextCard analytics={{ direction: "decrease" }} />
          </Grid>
        </Grid>
        <Grid item xs={8} className={style.firstRowSecondColumn}>
          <LineGraphCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
