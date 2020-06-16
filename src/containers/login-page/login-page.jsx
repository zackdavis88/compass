import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageHeader from "../../components/page-header/page-header";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { LoginPageWrapper } from "./login-page.styles";
import { authenticate } from "../../store/actions/auth";
import { createUser } from "../../store/actions/user";
import { showNotification } from "../../store/actions/notification";
import LoginForm from "../../components/login-form/login-form";
import SignUpForm from "../../components/sign-up-form/sign-up-form";
import { push } from "connected-react-router";

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
          showNotification={props.showNotification}
          goToDashboard={() => props.historyPush("/dashboard")}
        />
      ) : (
        <SignUpForm
          dataTestId="signUpForm"
          signUpInProgress={props.signUpInProgress}
          signUp={props.signUp}
          userError={props.userError}
          showLoginForm={() => setShowSignUpForm(false)}
          showNotification={props.showNotification}
        />
      )}
    </LoginPageWrapper>
  );
};

LoginPage.propTypes = {
  authInProgress: PropTypes.bool.isRequired,
  signUpInProgress: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  authError: PropTypes.string,
  userError: PropTypes.string
};

export default connect((state) => ({
  authInProgress: state.auth.isLoading,
  signUpInProgress: state.user.isLoading,
  authError: state.auth.error,
  userError: state.user.error
}), {
  authenticate,
  signUp: createUser,
  showNotification,
  historyPush: push
})(LoginPage);
