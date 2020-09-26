import React, {Fragment} from "react";
import { GlobalStyle } from "./common-styles/base";
import Navbar from "./containers/navbar/navbar";
import Notification from "./containers/notification/notification";
import Sidebar from "./containers/sidebar/sidebar";
import Main from "./containers/main/main";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store/store";
import { Switch, Route } from "react-router-dom";
import allRoutes from "./routes";
import Footer from "./components/footer/footer";

const CompassApp = () => {
  return (
    <Fragment>
      <div id="appWrapper">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <GlobalStyle />
            <Navbar />
            <Sidebar />
            <Notification />
            <Main>
              <Switch>
                {allRoutes.map((routeProps, index) => (
                  <Route key={index} {...routeProps} />
                ))}
              </Switch>
            </Main>
            <Footer />
          </ConnectedRouter>
        </Provider>
      </div>
      <div id="viewportError">
        Unsupported Viewport. The Compass application requires a minimum width of 1000 pixels.
      </div>
    </Fragment>
  );
};

export default CompassApp;
