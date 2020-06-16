import React from "react";
import SignUpForm from "./sign-up-form";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<SignUpForm />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestForm",
      signUpInProgress: false,
      userError: undefined,
      showLoginForm: jest.fn(),
      signUp: jest.fn().mockReturnValue({
        message: "mock test message",
        user: {
          username: "testUser"
        }
      }),
      showNotification: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<SignUpForm {...props}/>);
    expect(component).toBeDefined();
  });

  it("should render the sign up form inputs", () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUpForm {...props}/>);
    expect(getByTestId(`${props.dataTestId}.usernameInput`)).toBeDefined();
    expect(getByPlaceholderText("Username")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.passwordInput`)).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.confirmInput`)).toBeDefined();
    expect(getByPlaceholderText("Confirm Password")).toBeDefined();
  });

  it("should render the sign up form actions with the sign up button disabled by default", () => {
    const { getByTestId, getByText } = render(<SignUpForm {...props}/>);
    expect(getByTestId(`${props.dataTestId}.signUpButton`)).toBeDefined();
    expect(getByText("Sign Up")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.goToLoginButton`)).toBeDefined();
    expect(getByText("Back")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.signUpButton`)).toBeDisabled();
  });

  it("should enable the sign up button once all inputs have value", () => {
    const { getByTestId } = render(<SignUpForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.signUpButton`);
    const usernameInput = getByTestId(`${props.dataTestId}.usernameInput.input`);
    const passwordInput = getByTestId(`${props.dataTestId}.passwordInput.input`);
    const confirmInput = getByTestId(`${props.dataTestId}.confirmInput.input`);
    // Update the username input
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    expect(button).toBeDisabled();
    // Update the password input
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    expect(button).toBeDisabled();
    fireEvent.change(confirmInput, {
      target: {
        value: "Password1"
      }
    });
    expect(button).toBeEnabled();
  });

  it("should call the signUp method when the sign up button is clicked", () => {
    const { getByTestId } = render(<SignUpForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.signUpButton`);
    const usernameInput = getByTestId(`${props.dataTestId}.usernameInput.input`);
    const passwordInput = getByTestId(`${props.dataTestId}.passwordInput.input`);
    const confirmInput = getByTestId(`${props.dataTestId}.confirmInput.input`);
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.change(confirmInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.click(button);
    expect(props.signUp).toHaveBeenCalled();
  });

  it("should call the showNotification and showLoginForm methods when the sign up is successful", async () => {
    const { getByTestId } = render(<SignUpForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.signUpButton`);
    const usernameInput = getByTestId(`${props.dataTestId}.usernameInput.input`);
    const passwordInput = getByTestId(`${props.dataTestId}.passwordInput.input`);
    const confirmInput = getByTestId(`${props.dataTestId}.confirmInput.input`);
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.change(confirmInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.click(button);
    await waitFor(() => expect(props.showNotification).toHaveBeenCalledWith(
      "mock test message",
      "info",
      true
    ));
    await waitFor(() => expect(props.showLoginForm).toHaveBeenCalled());
  });

  it("should not call the showNotification or showLoginForm methods if sign up fails", async () => {
    props.signUp.mockReturnValueOnce(undefined);
    const { getByTestId } = render(<SignUpForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.signUpButton`);
    const usernameInput = getByTestId(`${props.dataTestId}.usernameInput.input`);
    const passwordInput = getByTestId(`${props.dataTestId}.passwordInput.input`);
    const confirmInput = getByTestId(`${props.dataTestId}.confirmInput.input`);
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.change(confirmInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.click(button);
    await waitFor(() => expect(props.showNotification).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(props.showLoginForm).toHaveBeenCalledTimes(0));
  });

  it("should render and error message if confirm and password input do not match", () => {
    const {getByTestId, getByText} = render(<SignUpForm {...props} />);
    const button = getByTestId(`${props.dataTestId}.signUpButton`);
    const usernameInput = getByTestId(`${props.dataTestId}.usernameInput.input`);
    const passwordInput = getByTestId(`${props.dataTestId}.passwordInput.input`);
    const confirmInput = getByTestId(`${props.dataTestId}.confirmInput.input`);
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.change(confirmInput, {
      target: {
        value: "password1"
      }
    });
    fireEvent.click(button);
    expect(getByText("confirm and password input must be matching")).toBeDefined();
  });

  it("should call the showLoginForm method when the back button is clicked", () => {
    const { getByTestId } = render(<SignUpForm {...props}/>);
    const button = getByTestId(`${props.dataTestId}.goToLoginButton`);
    fireEvent.click(button);
    expect(props.showLoginForm).toHaveBeenCalled();
  });
});
