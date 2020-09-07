import React, { Fragment } from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import "@testing-library/jest-dom";
import "babel-polyfill";
import { apiMiddleware } from "./store/utils";
import { createBrowserHistory } from "history";

export const mockStore = configureStore([
  thunk,
  routerMiddleware(createBrowserHistory()),
  apiMiddleware
]); //middleware goes here.

export const render = (component, store) => {
  if(store){
    return testingLibraryRender(
      <Provider store={store}>
        {component}
      </Provider>
    );
  }
  else{
    return testingLibraryRender(
      <Fragment>
        {component}
      </Fragment>
    );
  }
};
