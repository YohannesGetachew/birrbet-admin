import React, { useContext } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Route, BrowserRouter } from "react-router-dom";
import { appThemeLight } from "./theme";
import Login from "./pages/unauthenticated/login";
import MainPage from "./pages";
import { AuthContext } from "./contexts/auth";

const renderByAuthorization = (authData) => {
  return authData ? <MainPage /> : <Login />;
};

const App = () => {
  const { authData } = useContext(AuthContext);
  const theme = createMuiTheme(appThemeLight);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Route path="/" render={() => renderByAuthorization(authData)} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
