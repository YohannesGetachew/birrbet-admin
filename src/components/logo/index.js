import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { CollapseContext } from "../../contexts/collapse";
import logoStyle from "./style";

const Logo = () => {
  const { collapseData } = useContext(CollapseContext);
  const { collapsed, handleCollapse } = collapseData;
  const style = logoStyle({ collapsed });
  return (
    <Grid container className={style.root}>
      <Grid item className={style.logoC}>
        <h1 className={style.logo}>
          <span className={style.onlyLogo}>B</span>
          <span className={style.logoName}>Birr Bets</span>
        </h1>
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
