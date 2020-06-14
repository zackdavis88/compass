import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { faArrowLeft, faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, CloseButton } from "../../common-styles/form";
import InputBox from "../../components/input-box/input-box";
import Button from "../../components/button/button";

const SignUpForm = (props) => {
  const {signUpInProgress, userError, dataTestId, showLoginForm, signUp} = props;
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameInputError, setUsernameInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [confirmInputError, setConfirmInputError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  useEffect(() => {
    // Handle errors here. Assign it to either:
    // 1. Form error
    // 2. Individual form input
    // Depending on the type of error and/or contents of the message.
  }, [userError]);

  const _signUpDisabled = () => ((!usernameInput || !passwordInput || !confirmInput) || signUpInProgress);

  const _handleSignUp = () => {
    if(confirmInput !== passwordInput)
      return setConfirmInputError("confirm and password input must be matching");
    
    signUp();
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
    dataTestId: `${dataTestId}.signUpButton`
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
        <Button {...goToLoginButtonProps} />
        <Button {...signUpButtonProps} />
      </Form.Actions>
    </Form>
  );
};

SignUpForm.propTypes = {
  signUpInProgress: PropTypes.bool.isRequired,
  showLoginForm: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  userError: PropTypes.string,
  dataTestId: PropTypes.string
};

export default SignUpForm;
