import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageHeader from "../../components/page-header/page-header";
import { faExclamationTriangle, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { LoginPageWrapper } from "./login-page.styles";
import { Form } from "../../common-styles/form";
import InputBox from "../../components/input-box/input-box";
import Button from "../../components/button/button";
import { authenticate } from "../../store/actions/auth";

const LoginPage = ({authInProgress, authenticate}) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const _loginDisabled = () => ((!usernameInput || !passwordInput) || authInProgress);

  const _handleLogin = async () => {
    // console.log('here');
    const response = await authenticate(usernameInput, passwordInput);
    // console.log(response);
    // console.log('end');
  };

  const usernameInputProps = {
    id: "usernameInput",
    dataTestId: "usernameInput",
    label: "Username",
    placeholder: "Enter a username",
    value: usernameInput,
    isRequired: true,
    onChange: (value) => setUsernameInput(value)
  };

  const passwordInputProps = {
    id: "passwordInput",
    dataTestId: "passwordInput",
    type: "password",
    label: "Password",
    placeholder: "Enter a Password",
    value: passwordInput,
    isRequired: true,
    onChange: (value) => setPasswordInput(value)
  };

  const primaryButtonProps = {
    primary: true,
    disabled: _loginDisabled(),
    startIcon: faSignInAlt,
    label: "Sign In",
    onClick: _handleLogin,
    dataTestId: "loginButton"
  };

  const secondaryButtonProps = {
    secondary: true,
    disabled: false,
    startIcon: faUserPlus,
    label: "Sign Up",
    onClick: () => {},
    dataTestId: "signUpButton"
  };

  return (
    <LoginPageWrapper>
      <PageHeader dataTestId="loginPageHeader" text="Login Required" icon={faExclamationTriangle} textCenter/>
      <Form data-testid="loginForm">
        <Form.Section>
          <InputBox {...usernameInputProps} />
          <InputBox {...passwordInputProps} />
        </Form.Section>
        <Form.Actions>
          <Button {...primaryButtonProps} />
          <Button {...secondaryButtonProps} />
        </Form.Actions>
      </Form>
    </LoginPageWrapper>
  );
};

LoginPage.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default connect((state) => ({
  authInProgress: state.auth.isLoading
}), {
  authenticate
})(LoginPage);
