import React, {useState} from "react";
import PropTypes from "prop-types";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Form } from "../../common-styles/form";
import InputBox from "../../components/input-box/input-box";
import Button from "../../components/button/button";

const LoginForm = (props) => {
  const {dataTestId, authenticate, authInProgress, showSignUpForm} = props;
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [formError, setFormError] = useState("");

  const _loginDisabled = () => ((!usernameInput || !passwordInput) || authInProgress);
  
  // if we are awaiting the authentication API response, set "auth in progress"
  // if we are disabled but not awaiting API, set "missing required data"
  // default to empty-string
  const _loginTooltip = () => _loginDisabled() ? authInProgress ? "authentication in progress" : "missing required fields" : "";
  
  const _handleLogin = async () => {
    setFormError("");
    const response = await authenticate(usernameInput, passwordInput);
    if(response.error)
      return setFormError(response.error);
    
    props.goToDashboard();
  };

  const usernameInputProps = {
    id: "usernameInput",
    dataTestId: `${dataTestId}.usernameInput`,
    label: "Username",
    placeholder: "Enter your username",
    value: usernameInput,
    isRequired: true,
    onChange: (value) => {
      if(formError)
        setFormError("");
      
      setUsernameInput(value);
    }
  };

  const passwordInputProps = {
    id: "passwordInput",
    dataTestId: `${dataTestId}.passwordInput`,
    type: "password",
    label: "Password",
    placeholder: "Enter your Password",
    value: passwordInput,
    isRequired: true,
    onChange: (value) => {
      if(formError)
        setFormError("");
      
      setPasswordInput(value);
    }
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
    dataTestId: `${dataTestId}.goToSignUpButton`,
    onClick: () => showSignUpForm()
  };

  return (
    <Form data-testid={dataTestId}>
      <Form.Error hasError={!!formError}>
        {formError}
      </Form.Error>
      <Form.Section>
        <InputBox {...usernameInputProps} />
        <InputBox {...passwordInputProps} />
      </Form.Section>
      <Form.Actions>
        <Button {...loginButtonProps} />
        <Button {...goToSignUpButtonProps} />
      </Form.Actions>
    </Form>
  );
};

LoginForm.propTypes = {
  authInProgress: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  showSignUpForm: PropTypes.func.isRequired,
  goToDashboard: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default LoginForm;
