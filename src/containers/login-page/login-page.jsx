import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PageHeader from "../../components/page-header/page-header";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { LoginPageWrapper } from "./login-page.styles";
import { Form } from "../../common-styles/form";
import InputBox from "../../components/input-box/input-box";

const LoginPage = (props) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

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

  return (
    <LoginPageWrapper>
      <PageHeader dataTestId="loginPageHeader" text="Login Required" icon={faExclamationTriangle} textCenter/>
      <Form data-testid="loginForm">
        <Form.Section>
          <InputBox {...usernameInputProps} />
          <InputBox {...passwordInputProps} />
        </Form.Section>
      </Form>
    </LoginPageWrapper>
  );
};

export default connect((state) => ({
  // mapStateToProps
}), {
  // mapDispatchToProps
})(LoginPage);
