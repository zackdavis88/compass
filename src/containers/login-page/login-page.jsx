import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageHeader from "../../components/page-header/page-header";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { LoginPageWrapper } from "./login-page.styles";
import { authenticate } from "../../store/actions/auth";
import LoginForm from "../../components/login-form/login-form";
import SignUpForm from "../../components/sign-up-form/sign-up-form";

const LoginPage = (props) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

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
        <SignUpForm
          dataTestId="signUpForm"
          signUpInProgress={false}
          signUp={() => {}}
          userError={props.userError}
          showLoginForm={() => setShowSignUpForm(false)}
        />
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
