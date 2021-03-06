import React, {useState} from "react";
import PropTypes from "prop-types";
import { faArrowLeft, faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, CloseButton } from "../../common-styles/form";
import InputBox from "../../components/input-box/input-box";
import Button from "../../components/button/button";

const SignUpForm = (props) => {
  const {signUpInProgress, dataTestId, showLoginForm, signUp} = props;
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameInputError, setUsernameInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [confirmInputError, setConfirmInputError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const _signUpDisabled = () => ((!usernameInput || !passwordInput || !confirmInput) || signUpInProgress);

  const _signUpTooltip = () => _signUpDisabled() ? signUpInProgress ? "authentication in progress" : "missing required fields" : "";

  const _handleError = (errorMessage) => {
    if(errorMessage.includes("username"))
      setUsernameInputError(errorMessage);
    else if(errorMessage.includes("password"))
      setPasswordInputError(errorMessage);
    else
      setSignUpError(errorMessage);
  };

  const _handleSignUp = async () => {
    if(confirmInput !== passwordInput)
      return setConfirmInputError("confirm and password input must be matching");
    
    const response = await signUp(usernameInput, passwordInput);
    if(response && response.error)
      return _handleError(response.error); // bail out if we did not receive a successful response

    props.showNotification(response.message, "info", true);
    showLoginForm();
  };

  const _handleChange = (inputName, value) => {
    switch(inputName){
      case "username":
        setUsernameInputError("");
        return setUsernameInput(value);
      case "password":
        setPasswordInputError("");
        return setPasswordInput(value);
      case "confirm":
        setConfirmInputError("");
        return setConfirmInput(value);
    }
  };

  const usernameInputProps = {
    id: "usernameInput",
    dataTestId: `${dataTestId}.usernameInput`,
    label: "Username",
    placeholder: "Enter a username",
    value: usernameInput,
    isRequired: true,
    onChange: (value) => _handleChange("username", value),
    errorText: usernameInputError
  };

  const passwordInputProps = {
    id: "passwordInput",
    dataTestId: `${dataTestId}.passwordInput`,
    type: "password",
    label: "Password",
    placeholder: "Enter a Password",
    value: passwordInput,
    isRequired: true,
    onChange: (value) => _handleChange("password", value),
    errorText: passwordInputError
  };

  const confirmInputProps = {
    id: "confirmInput",
    dataTestId: `${dataTestId}.confirmInput`,
    type: "password",
    label: "Confirm Password",
    placeholder: "Enter the password again",
    value: confirmInput,
    isRequired: true,
    onChange: (value) => _handleChange("confirm", value),
    errorText: confirmInputError
  };

  const signUpButtonProps = {
    primary: true,
    disabled: _signUpDisabled(),
    startIcon: faUserPlus,
    label: "Sign Up",
    onClick: _handleSignUp,
    dataTestId: `${dataTestId}.signUpButton`,
    tooltip: _signUpTooltip()
  };

  const goToLoginButtonProps = {
    secondary: true,
    disabled: false,
    startIcon: faArrowLeft,
    label: "Back",
    onClick: () => showLoginForm(),
    dataTestId: `${dataTestId}.goToLoginButton`
  };

  return (
    <Form data-testid={dataTestId}>
      <Form.Error hasError={!!signUpError}>
        <CloseButton onClick={() => setSignUpError("")}>
          <FontAwesomeIcon icon={faTimes} size="xs" fixedWidth/>
        </CloseButton>
        {signUpError}
      </Form.Error>
      <Form.Section>
        <InputBox {...usernameInputProps} />
        <InputBox {...passwordInputProps} />
        <InputBox {...confirmInputProps}  />
      </Form.Section>
      <Form.Actions>
        <Button {...signUpButtonProps} />
        <Button {...goToLoginButtonProps} />
      </Form.Actions>
    </Form>
  );
};

SignUpForm.propTypes = {
  signUpInProgress: PropTypes.bool.isRequired,
  showLoginForm: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default SignUpForm;
