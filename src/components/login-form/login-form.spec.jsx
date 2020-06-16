import React from "react";
import LoginForm from "./login-form";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<LoginForm />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestForm",
      authInProgress: false,
      authError: undefined,
      showSignUpForm: jest.fn(),
      authenticate: jest.fn().mockReturnValue({
        message: "mock auth success",
        user: {
          username: "testUser"
        }
      }),
      showNotification: jest.fn(),
      goToDashboard: jest.fn()
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
    expect(props.authenticate).toHaveBeenCalledWith("testUser", "Password1");
  });

  it("should show a success notification and redirect the user to the dashboard", async () => {
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
    await waitFor(() => expect(props.showNotification).toHaveBeenCalledWith(
      "mock auth success",
      "info",
      true
    ));
    await waitFor(() => expect(props.goToDashboard).toHaveBeenCalled());
  });

  it("should not show a notification or redirect the user if authentication fails", async () => {
    props.authenticate.mockReturnValueOnce(undefined);
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
    await waitFor(() => expect(props.showNotification).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(props.goToDashboard).toHaveBeenCalledTimes(0));
  });

  it("should call the showSignUpForm method when the sign-up button is clicked", () => {
    const { getByTestId } = render(<LoginForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.goToSignUpButton`);
    fireEvent.click(button);
    expect(props.showSignUpForm).toHaveBeenCalled();
  });

  it("should render the tooltip for the submit button when it is disabled", () => {
    const {getByTestId, getByText} = render(<LoginForm {...props}/>);
    const loginButton = getByTestId(`${props.dataTestId}.loginButton`);
    expect(loginButton).toBeDisabled();
    fireEvent.mouseOver(loginButton);
    expect(getByText("missing required fields")).toBeDefined();
  });

  it("should render the tooltip for submit button when it is disabled due to pending API call", () => {
    props.authInProgress = true;
    const {getByTestId, getByText} = render(<LoginForm {...props}/>);
    const loginButton = getByTestId(`${props.dataTestId}.loginButton`);
    expect(loginButton).toBeDisabled();
    fireEvent.mouseOver(loginButton);
    expect(getByText("authentication in progress")).toBeDefined();
  });
});
