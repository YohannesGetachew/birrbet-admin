import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { CollapseContext } from "../../../contexts/collapse";
import navItemStyle from "./style";

const NavigationItem = ({ route }) => {
  const match = useRouteMatch(route.path);
  const {
    collapseData: { collapsed },
  } = useContext(CollapseContext);
  const style = navItemStyle({ match, collapsed });
  return (
    <Grid item xs={12} className={style.root}>
      <Link to={route.path} className={style.link}>
        <Grid container className={style.iconNnameC}>
          <Grid item className={style.iconC}>
            {route.icon}
          </Grid>
          <Grid item className={style.nameC}>
            {route.menuName}
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
};

NavigationItem.propTypes = {
  route: PropTypes.shape({
    menuName: PropTypes.string,
    path: PropTypes.string,
  }),
};

export default NavigationItem;
