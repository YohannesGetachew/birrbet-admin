import React from "react";
import { Grid } from "@material-ui/core";
import Navigation from "../navigation";
import UserInfo from "../userInfo";
import Logo from "../logo";
import sideNavStyle from "./style";
const SideBar = () => {
  const style = sideNavStyle();
  return (
    <Grid container className={style.root}>
      <Grid item className={style.scrollable}>
        <Grid className={style.logoC}>
          <Logo />
        </Grid>

        <Grid className={style.navigationC}>
          <Navigation />
        </Grid>
      </Grid>
      <Grid item container alignItems="center" className={style.nonScrollable}>
        <UserInfo />
      </Grid>
    </Grid>
  );
};

export default SideBar;
