import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { faSignInAlt, faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, CloseButton } from "../../common-styles/form";
import InputBox from "../../components/input-box/input-box";
import Button from "../../components/button/button";

const LoginForm = (props) => {
  const {dataTestId, authenticate, authInProgress, authError, showSignUpForm} = props;
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if(loginError !== authError)
      setLoginError(authError);
  }, [authError]);

  const _loginDisabled = () => ((!usernameInput || !passwordInput) || authInProgress);
  
  // if we are awaiting the authentication API response, set "auth in progress"
  // if we are disabled but not awaiting API, set "missing required data"
  // default to empty-string
  const _loginTooltip = () => _loginDisabled() ? authInProgress ? "authentication in progress" : "missing required fields" : "";
  
  const _handleLogin = async () => {
    setLoginError("");
    const response = await authenticate(usernameInput, passwordInput);
    if(!response)
      return;
    
    props.showNotification(response.message, "info", true);
    props.goToDashboard();
  };

  const usernameInputProps = {
    id: "usernameInput",
    dataTestId: `${dataTestId}.usernameInput`,
    label: "Username",
    placeholder: "Enter your username",
    value: usernameInput,
    isRequired: true,
    onChange: (value) => setUsernameInput(value)
  };

  const passwordInputProps = {
    id: "passwordInput",
    dataTestId: `${dataTestId}.passwordInput`,
    type: "password",
    label: "Password",
    placeholder: "Enter your Password",
    value: passwordInput,
    isRequired: true,
    onChange: (value) => setPasswordInput(value)
  };

  const loginButtonProps = {
    primary: true,
    disabled: _loginDisabled(),
    startIcon: faSignInAlt,
    label: "Sign In",
    onClick: _handleLogin,
    dataTestId: `${dataTestId}.loginButton`,
    tooltip: _loginTooltip()
  };

  const goToSignUpButtonProps = {
    secondary: true,
    disabled: false,
    startIcon: faUserPlus,
    label: "Sign Up",
    onClick: () => showSignUpForm(),
    dataTestId: `${dataTestId}.goToSignUpButton`
  };

  return (
    <Form data-testid={dataTestId}>
      <Form.Error hasError={!!loginError}>
        <CloseButton onClick={() => setLoginError("")}>
          <FontAwesomeIcon icon={faTimes} size="xs" fixedWidth/>
        </CloseButton>
        {loginError}
      </Form.Error>
      <Form.Section>
        <InputBox {...usernameInputProps} />
        <InputBox {...passwordInputProps} />
      </Form.Section>
      <Form.Actions>
        <Button {...goToSignUpButtonProps} />
        <Button {...loginButtonProps} />
      </Form.Actions>
    </Form>
  );
};

LoginForm.propTypes = {
  authInProgress: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  showSignUpForm: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  goToDashboard: PropTypes.func.isRequired,
  authError: PropTypes.string,
  dataTestId: PropTypes.string
};

export default LoginForm;
