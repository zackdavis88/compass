import React from "react";
import { GlobalStyle } from "./common-styles/base";
import Navbar from "./containers/navbar/navbar";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store/store";

const CompassApp = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <Navbar />
      </ConnectedRouter>
    </Provider>
  );
};

export default CompassApp;
