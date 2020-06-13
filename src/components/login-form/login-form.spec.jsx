import React from "react";
import LoginForm from "./login-form";
import { render, mockStore } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<LoginForm />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestForm",
      authInProgress: false,
      authError: undefined,
      showSignUpForm: jest.fn(),
      authenticate: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<LoginForm {...props}/>);
    expect(component).toBeDefined();
  });

  it("should render the login form inputs", () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginForm {...props}/>);
    expect(getByTestId(`${props.dataTestId}.usernameInput`)).toBeDefined();
    expect(getByPlaceholderText("Username")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.passwordInput`)).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
  });

  it("should render the login form actions with the login button disabled by default", () => {
    const { getByTestId, getByText } = render(<LoginForm {...props}/>);
    expect(getByTestId(`${props.dataTestId}.loginButton`)).toBeDefined();
    expect(getByText("Sign In")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.goToSignUpButton`)).toBeDefined();
    expect(getByText("Sign Up")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.loginButton`)).toBeDisabled();
  });

  it("should enable the login button once username and password inputs have value", () => {
    const { getByTestId } = render(<LoginForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.loginButton`);
    const usernameInput = getByTestId(`${props.dataTestId}.usernameInput.input`);
    const passwordInput = getByTestId(`${props.dataTestId}.passwordInput.input`);
    // Update the username input
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    // Button should still be disabled at this point
    expect(button).toBeDisabled();
    // Update the password input
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    // Button should be enabled
    expect(button).toBeEnabled();
  });

  it("should call the authenticate method when the login button is clicked", () => {
    const { getByTestId } = render(<LoginForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.loginButton`);
    const usernameInput = getByTestId(`${props.dataTestId}.usernameInput.input`);
    const passwordInput = getByTestId(`${props.dataTestId}.passwordInput.input`);
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    expect(button).toBeDisabled();
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.click(button);
    expect(props.authenticate).toHaveBeenCalled();
  });

  it("should call the showSignUpForm method when the sign-up button is clicked", () => {
    const { getByTestId } = render(<LoginForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.goToSignUpButton`);
    fireEvent.click(button);
    expect(props.showSignUpForm).toHaveBeenCalled();
  });

  // LEGACY: Preserved for future reference.
  // it("should dispatch a redux API call to authenticate user credentials", async () => {
  //   const { getByTestId } = render(<LoginPage />, store);
  //   const button = getByTestId("loginButton");
  //   const usernameInput = getByTestId("loginUsernameInput.input");
  //   const passwordInput = getByTestId("loginPasswordInput.input");
  //   fireEvent.change(usernameInput, {
  //     target: {
  //       value: "testUser"
  //     }
  //   });
  //   fireEvent.change(passwordInput, {
  //     target: {
  //       value: "Password1"
  //     }
  //   });
  //   fireEvent.click(button);
  //   await waitFor(() => expect(store.getActions()).toHaveLength(2));
  //   // First action should be the REQUEST
  //   expect(store.getActions()[0].type).toBe("TOKEN_REQUEST");

  //   // Second action is expected to be SUCCESS or FAILURE
  //   const expectedTypes = ["TOKEN_SUCCESS", "TOKEN_FAILURE"];
  //   expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  // });
});
