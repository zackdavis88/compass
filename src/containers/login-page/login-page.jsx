import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PageWrapper } from "../../common-styles/base";
import PageHeader from "../../components/page-header/page-header";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const LoginPage = (props) => {
  return (
    <PageWrapper>
      <PageHeader text="Login Required" icon={faExclamationTriangle} textCenter />
    </PageWrapper>
  );
};

export default connect((state) => ({
  // mapStateToProps
}), {
  // mapDispatchToProps
})(LoginPage);
