import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store/store";
import { Switch, Route } from "react-router-dom";
import allRoutes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme";
import GlobalNavigation from "./components/_materia/GlobalNavigation/GlobalNavigation";

const CompassApp = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalNavigation />
        </ThemeProvider>
        {/* <GlobalStyle />
        <Navbar />
        <Sidebar />
        <Notification />
        <Main>
          <Switch>
            {allRoutes.map((routeProps, index) => (
              <Route key={index} {...routeProps} />
            ))}
          </Switch>
        </Main> */}
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
      </ConnectedRouter>
    </Provider>
  );
};

export default CompassApp;
