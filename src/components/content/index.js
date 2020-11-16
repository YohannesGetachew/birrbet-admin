import React, { useContext } from "react";
import getAuthorizedRoutes from "../../routes";
import { Switch, Route, Redirect } from "react-router-dom";
import ContentHeader from "../contentHeader";
import ContentFooter from "../contentFooter";
import contentStyle from "./style";
import { AuthContext } from "../../contexts/auth";

const Content = () => {
  const { authData } = useContext(AuthContext);
  const { role } = authData.userData;
  const style = contentStyle();
  const Routes = getAuthorizedRoutes(role);
  return (
    <div className={style.root}>
      <div className={style.headerNbodyC}>
        {Routes.map((route) =>
          route.items.map((routeItem) => (
            <div key={routeItem.path}>
              {routeItem.subRoutes &&
                routeItem.subRoutes.map((subRoute) => (
                  <Route
                    key={`${routeItem.path}${subRoute.path}`}
                    path={`${routeItem.path}${subRoute.path}`}
                    children={({ match }) =>
                      match &&
                      match.isExact && (
                        <ContentHeader title={subRoute.subRouteName} />
                      )
                    }
                  ></Route>
                ))}
              <Route
                path={routeItem.path}
                children={({ match }) =>
                  match &&
                  match.isExact && (
                    <ContentHeader
                      title={routeItem.menuName}
                      description={routeItem.description}
                    />
                  )
                }
              ></Route>
            </div>
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
      <div className={style.footerC}>
        <ContentFooter />
      </div>
    </div>
  );
};

export default Content;
