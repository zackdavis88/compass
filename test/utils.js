import React from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

export const mockStore = configureStore([thunk]); //middleware goes here.

export const render = (component, store) => {
  store.dispatch = jest.fn();
  return testingLibraryRender(
    <Provider store={store}>
      {component}
    </Provider>
  );
};
