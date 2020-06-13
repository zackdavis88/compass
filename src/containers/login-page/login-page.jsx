import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageHeader from "../../components/page-header/page-header";
import { faExclamationTriangle, faUserPlus, faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginPageWrapper } from "./login-page.styles";
import { Form, CloseButton } from "../../common-styles/form";
import InputBox from "../../components/input-box/input-box";
import Button from "../../components/button/button";
import { authenticate } from "../../store/actions/auth";
import LoginForm from "../../components/login-form/login-form";

const LoginPage = (props) => {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirm, setSignUpConfirm] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const _signUpDisabled = () => ((!signUpUsername || !signUpPassword));

  const signUpUsernameInputProps = {
    id: "signUpUsernameInput",
    dataTestId: "signUpUsernameInput",
    label: "Username",
    placeholder: "Enter a username",
    value: signUpUsername,
    isRequired: true,
    onChange: (value) => setSignUpUsername(value)
  };

  const signUpPasswordInputProps = {
    id: "signUpPasswordInput",
    dataTestId: "signUpPasswordInput",
    type: "password",
    label: "Password",
    placeholder: "Enter a Password",
    value: signUpPassword,
    isRequired: true,
    onChange: (value) => setSignUpPassword(value)
  };

  const signUpConfirmInputProps = {
    id: "signUpConfirmInput",
    dataTestId: "signUpConfirmInput",
    type: "password",
    label: "Confirm Password",
    placeholder: "Enter the password again",
    value: signUpConfirm,
    isRequired: true,
    onChange: (value) => setSignUpConfirm(value)
  };

  const signUpButtonProps = {
    primary: true,
    disabled: _signUpDisabled(),
    startIcon: faUserPlus,
    label: "Sign Up",
    onClick: () => {},
    dataTestId: "signUpButton"
  };

  const goToLoginButtonProps = {
    secondary: true,
    disabled: false,
    startIcon: faArrowLeft,
    label: "Back",
    onClick: () => setShowSignUpForm(false),
    dataTestId: "goToLoginButton"
  };

  return (
    <LoginPageWrapper>
      <PageHeader dataTestId="loginPageHeader" text="Login Required" icon={faExclamationTriangle} textCenter/>
      {!showSignUpForm ? (
        <LoginForm
          dataTestId="loginForm"
          authInProgress={props.authInProgress}
          authenticate={props.authenticate}
          authError={props.authError}
          showSignUpForm={() => setShowSignUpForm(true)}
        />
      ) : (
        <Form data-testid="signUpForm">
          <Form.Error hasError={!!signUpError}>
            <CloseButton onClick={() => setSignUpError("")}>
              <FontAwesomeIcon icon={faTimes} size="xs" fixedWidth/>
            </CloseButton>
            {signUpError}
          </Form.Error>
          <Form.Section>
            <InputBox {...signUpUsernameInputProps} />
            <InputBox {...signUpPasswordInputProps} />
            <InputBox {...signUpConfirmInputProps}  />
          </Form.Section>
          <Form.Actions>
            <Button {...goToLoginButtonProps} />
            <Button {...signUpButtonProps} />
          </Form.Actions>
        </Form>
      )}
    </LoginPageWrapper>
  );
};

LoginPage.propTypes = {
  authenticate: PropTypes.func.isRequired,
  authInProgress: PropTypes.bool.isRequired,
  authError: PropTypes.string
};

export default connect((state) => ({
  authInProgress: state.auth.isLoading,
  authError: state.auth.error
}), {
  authenticate
})(LoginPage);
