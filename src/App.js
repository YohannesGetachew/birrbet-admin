import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Route, BrowserRouter } from "react-router-dom";
import { appThemeLight } from "./theme";
import Login from "./pages/unauthenticated/login";
import MainPage from "./pages";

const renderMainPage = (user, props) => {
  return user ? <MainPage /> : <Login />;
};

const App = () => {
  const theme = createMuiTheme(appThemeLight);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Route path="/" render={(props) => renderMainPage(false, props)} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
