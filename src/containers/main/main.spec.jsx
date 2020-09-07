import React from "react";
import Main from "./main";
import { render, mockStore } from "../../test-utils";
import { waitFor } from "@testing-library/react";

describe("<Main />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      router: {
        location: {
          pathname: "/test/route"
        }
      },
      auth: {
        token: undefined
      }
    });

    store.dispatch = jest.fn();
  });

  it("should mount the component", () => {
    const component = render(<Main />, store);
    expect(component).toBeDefined();
  });

  it("should render children elements", () => {
    const {getByText} = render(<Main>Unit Testing</Main>, store);
    expect(getByText("Unit Testing")).toBeDefined();
  });

  it("should redirect and notify non-logged in users trying to access login-restricted pages", async() => {
    render(<Main />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      type: "@@router/CALL_HISTORY_METHOD",
      payload: {
        method: "push",
        args: ["/"]
      }
    });

    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: "SHOW_NOTIFICATION",
      notification: {
        message: "please login to access the application",
        type: "info",
        autoHide: true
      }
    });
  });

  it("should not redirect or notify logged in users trying to access login-restricted pages", () => {
    store = mockStore({
      router: {
        location: {
          pathname: "/test/route"
        }
      },
      auth: {
        token: "unit_test_token"
      }
    });
    store.dispatch = jest.fn();
    render(<Main />, store);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it("should validate a storedToken if we do not already have an auth token present", async() => {
    localStorage.setItem("token", "unit_test_stored_token");
    store.dispatch.mockReturnValueOnce({});
    render(<Main />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
  });

  it("should validate a token and redirect to dashboard if the desired location was the login page", async() => {
    localStorage.setItem("token", "unit_test_stored_token");
    store = mockStore({
      router: {
        location: {
          pathname: "/"
        }
      },
      auth: {
        token: ""
      }
    });
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({});
    render(<Main />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: '@@router/CALL_HISTORY_METHOD', 
      payload: {
        method: "push",
        args: ["/dashboard"]
      }
    });
  });

  it("should remove a storedToken and redirect to LoginPage if validation fails", async() => {
    localStorage.setItem("token", "unit_test_stored_token");
    store.dispatch.mockReturnValueOnce({error: "something went wrong"});
    render(<Main />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: '@@router/CALL_HISTORY_METHOD', 
      payload: {
        method: "push",
        args: ["/"]
      }
    });
  });
});
