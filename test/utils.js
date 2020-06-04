import React from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

export const mockStore = configureStore([]); //middleware goes here.

export const store = mockStore({
  sidebar: {
    isOpen: false
  }
});

export const render = (component) => {
  store.dispatch = jest.fn();
  return testingLibraryRender(
    <Provider store={store}>
      {component}
    </Provider>
  );
};
