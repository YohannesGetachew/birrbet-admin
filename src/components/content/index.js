import React from "react";
import Routes from "../../routes";
import { Switch, Route, Redirect } from "react-router-dom";
import ContentHeader from "../contentHeader";
import contentStyle from "./style";
const Content = () => {
  const style = contentStyle();
  return (
    <div className={style.root}>
      {Routes.map((route) =>
        route.items.map((routeItem) => (
          <Route
            key={routeItem.path}
            path={routeItem.path}
            children={({ match }) =>
              match && <ContentHeader title={routeItem.menuName} />
            }
          ></Route>
        ))
      )}

      <div className={style.contentBodyC}>
        <Switch>
          {Routes.map((route) =>
            route.items.map((routeItem) => (
              <Route
                key={routeItem.path}
                exact={true}
                path={routeItem.path}
                component={routeItem.content}
              />
            ))
          )}

          {Routes.map((route) =>
            route.items.map((routeItem) =>
              routeItem.subRoutes
                ? routeItem.subRoutes.map((subRoute) => (
                    <Route
                      key={`${routeItem.path}${subRoute.path}`}
                      exact={true}
                      path={`${routeItem.path}${subRoute.path}`}
                      component={subRoute.content}
                    />
                  ))
                : null
            )
          )}
          <Redirect from="/admin" to="/admin/dashboard" />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </div>
    </div>
  );
};

export default Content;
