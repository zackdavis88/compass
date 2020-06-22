import React from "react";
import ChangePasswordModal from "./change-password-modal";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<ChangePasswordModal />", () => {
  let props;
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      changePassword: jest.fn(),
      showNotification: jest.fn(),
      requestInProgress: false,
      userInfo: {
        username: "testuser",
        displayName: "testUser"
      }
    };
  });

  it("should mount the component", () => {
    const component = render(<ChangePasswordModal {...props}/>);
    expect(component).toBeDefined();
  });

  it("should disable the submit button by default", () => {
    const {getByTestId} = render(<ChangePasswordModal {...props}/>);
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
  });

  it("should enable the submit button if all input is present without input errors", () => {
    const {getByTestId} = render(<ChangePasswordModal {...props}/>);
    const currentPasswordInput = getByTestId("currentPasswordInput.input");
    const newPasswordInput = getByTestId("newPasswordInput.input");
    const confirmPasswordInput = getByTestId("confirmPasswordInput.input");
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    fireEvent.change(currentPasswordInput, {target: {value: "someCurrentPassword"}});
    fireEvent.change(newPasswordInput, {target: {value: "someNewPasswordInput"}});
    fireEvent.change(confirmPasswordInput, {target: {value: "someConfirmPasswordInput"}});
    expect(submitButton).toBeEnabled();
  });

  it("should disable the submit button if an API call is in progress", () => {
    props.requestInProgress = true;
    const {getByTestId} = render(<ChangePasswordModal {...props}/>);
    const currentPasswordInput = getByTestId("currentPasswordInput.input");
    const newPasswordInput = getByTestId("newPasswordInput.input");
    const confirmPasswordInput = getByTestId("confirmPasswordInput.input");
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    fireEvent.change(currentPasswordInput, {target: {value: "someCurrentPassword"}});
    fireEvent.change(newPasswordInput, {target: {value: "someNewPasswordInput"}});
    fireEvent.change(confirmPasswordInput, {target: {value: "someConfirmPasswordInput"}});
    expect(submitButton).toBeDisabled();
  });


  it("should disable the submit button if there is an input error", async() => {
    const {getByTestId, queryByText} = render(<ChangePasswordModal {...props}/>);
    const currentPasswordInput = getByTestId("currentPasswordInput.input");
    const newPasswordInput = getByTestId("newPasswordInput.input");
    const confirmPasswordInput = getByTestId("confirmPasswordInput.input");
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    fireEvent.change(currentPasswordInput, {target: {value: "someCurrentPassword"}});
    fireEvent.change(newPasswordInput, {target: {value: "someNewPasswordInput"}});
    fireEvent.change(confirmPasswordInput, {target: {value: "someConfirmPasswordInput"}});
    expect(queryByText("password input does not match the new password")).toBeNull();
    fireEvent.click(submitButton);
    await waitFor(() => expect(queryByText("password input does not match the new password")).toBeDefined());
    expect(submitButton).toBeDisabled();
  });

  it("should show an error message if confirmPassword input does not match newPassword input", async() => {
    const {getByTestId, queryByText} = render(<ChangePasswordModal {...props}/>);
    const currentPasswordInput = getByTestId("currentPasswordInput.input");
    const newPasswordInput = getByTestId("newPasswordInput.input");
    const confirmPasswordInput = getByTestId("confirmPasswordInput.input");
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    fireEvent.change(currentPasswordInput, {target: {value: "someCurrentPassword"}});
    fireEvent.change(newPasswordInput, {target: {value: "someNewPasswordInput"}});
    fireEvent.change(confirmPasswordInput, {target: {value: "someConfirmPasswordInput"}});
    expect(queryByText("password input does not match the new password")).toBeNull();
    fireEvent.click(submitButton);
    await waitFor(() => expect(queryByText("password input does not match the new password")).toBeDefined());
  });

  it("should render the tooltip for submit button when it is disabled due to pending API call", () => {
    props.requestInProgress = true;
    const {getByTestId, getByText} = render(<ChangePasswordModal {...props}/>);
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("request in progress")).toBeDefined();
  });

  it("should render the tooltip for submit button when it is disabled due to missing input", () => {
    const {getByTestId, getByText} = render(<ChangePasswordModal {...props}/>);
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("missing required fields")).toBeDefined();
  });

  it("should call the changePassword method if submit is clicked and there is no validation error", async() => {
    const currentPass = "someCurrentPassword";
    const newPass = "someNewPassword";
    props.changePassword.mockReturnValueOnce({});
    const {getByTestId} = render(<ChangePasswordModal {...props}/>);
    const currentPasswordInput = getByTestId("currentPasswordInput.input");
    const newPasswordInput = getByTestId("newPasswordInput.input");
    const confirmPasswordInput = getByTestId("confirmPasswordInput.input");
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    fireEvent.change(currentPasswordInput, {target: {value: currentPass}});
    fireEvent.change(newPasswordInput, {target: {value: newPass}});
    fireEvent.change(confirmPasswordInput, {target: {value: newPass}});
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.changePassword).toHaveBeenCalledTimes(1));
    expect(props.changePassword).toHaveBeenLastCalledWith(props.userInfo.username, currentPass, newPass);
  });

  it("should render an error message if one is returned from the API", async() => {
    const errMsg = "unit testing confirm error"
    props.changePassword.mockReturnValueOnce({
      error: errMsg
    });
    const {getByTestId, queryByText} = render(<ChangePasswordModal {...props}/>);
    const currentPasswordInput = getByTestId("currentPasswordInput.input");
    const newPasswordInput = getByTestId("newPasswordInput.input");
    const confirmPasswordInput = getByTestId("confirmPasswordInput.input");
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    fireEvent.change(currentPasswordInput, {target: {value: "someCurrentPassword"}});
    fireEvent.change(newPasswordInput, {target: {value: "someNewPasswordInput"}});
    fireEvent.change(confirmPasswordInput, {target: {value: "someNewPasswordInput"}});
    expect(queryByText(errMsg)).toBeNull();
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.changePassword).toHaveBeenCalled());
    expect(queryByText(errMsg)).toBeDefined();
  });

  it("should call onClose and showNotification methods after a successful API call", async() => {
    const expectedMessage = "unit test success message";
    props.changePassword.mockReturnValueOnce({message: expectedMessage});
    const {getByTestId} = render(<ChangePasswordModal {...props}/>);
    const currentPasswordInput = getByTestId("currentPasswordInput.input");
    const newPasswordInput = getByTestId("newPasswordInput.input");
    const confirmPasswordInput = getByTestId("confirmPasswordInput.input");
    const submitButton = getByTestId("changePasswordModal.actions.primaryButton");
    fireEvent.change(currentPasswordInput, {target: {value: "someCurrentPassword"}});
    fireEvent.change(newPasswordInput, {target: {value: "someNewPasswordInput"}});
    fireEvent.change(confirmPasswordInput, {target: {value: "someNewPasswordInput"}});
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.changePassword).toHaveBeenCalled());
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.showNotification).toHaveBeenCalledWith({message: expectedMessage});
  });
});
