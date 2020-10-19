import React, { useContext } from "react";
import NavigationItem from "./navigationItem";
import CategorizedRoutes from "../../routes";
import { CollapseContext } from "../../contexts/collapse";
import navigationStyle from "./style";

const Navigation = () => {
  const {
    collapseData: { collapsed },
  } = useContext(CollapseContext);
  const style = navigationStyle({ collapsed });
  return CategorizedRoutes.map((category) => (
    <div key={category.categoryName} className={style.root}>
      <h6 className={style.category}>{category.categoryName}</h6>
      {category.items.map((route) => (
        <NavigationItem className={route.path} route={route} key={route.path} />
      ))}
    </div>
  ));
};

export default Navigation;
