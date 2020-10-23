import React, { useContext } from "react";
import NavigationItem from "./navigationItem";
import getAuthorizedRoutes from "../../routes";
import { CollapseContext } from "../../contexts/collapse";
import { AuthContext } from "../../contexts/auth";
import navigationStyle from "./style";

const Navigation = () => {
  const {
    collapseData: { collapsed },
  } = useContext(CollapseContext);
  const { authData } = useContext(AuthContext);
  const { role } = authData.userData;
  const style = navigationStyle({ collapsed });
  const authorizedRoutes = getAuthorizedRoutes(role);
  return authorizedRoutes.map((category) => (
    <div key={category.categoryName} className={style.root}>
      <h6 className={style.category}>{category.categoryName}</h6>
      {category.items.map((route) => (
        <NavigationItem
          className={route.path}
          route={route}
          key={route.path}
          role={role}
        />
      ))}
    </div>
  ));
};

export default Navigation;
