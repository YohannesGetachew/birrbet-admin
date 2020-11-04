import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { CollapseContext } from "../../contexts/collapse";
import logo from "./logo.png";
import logoStyle from "./style";

const Logo = () => {
  const { collapseData } = useContext(CollapseContext);
  const { collapsed, handleCollapse } = collapseData;
  const style = logoStyle({ collapsed });
  return (
    <Grid container className={style.root}>
      <Grid item className={style.logoC}>
        <Grid container alignItems="center">
          <img width="40" height="40" src={logo} alt="Birr bet" />
          {/* <span className={style.onlyLogo}>B</span> */}
          <span className={style.logoName}>Birr Bets</span>
        </Grid>
      </Grid>
      <Grid item className={style.buttonC} onClick={handleCollapse}>
        {!collapsed ? (
          <ChevronLeft className={style.button} />
        ) : (
          <ChevronRight className={style.button} />
        )}
      </Grid>
    </Grid>
  );
};
export default Logo;
