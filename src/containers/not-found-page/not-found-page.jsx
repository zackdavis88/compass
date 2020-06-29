import React from "react";
import PropTypes from "prop-types";
import { NotFoundPageWrapper } from "./not-found-page.styles";
import PageHeader from "../../components/page-header/page-header";
import { faDrumstickBite, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {push as historyPush} from "connected-react-router";
import Button from "../../components/button/button";

const NotFoundPage = ({historyPush}) => {
  return (
    <NotFoundPageWrapper>
      <PageHeader
        dataTestId="notFoundPageHeader"
        text="Page Not Found"
        icon={faDrumstickBite}
        textCenter
      />
      <span>
        Sorry, the requested page was not found.
      </span>
      <Button
        secondary
        startIcon={faArrowLeft}
        label="Back to Dashboard"
        onClick={() => historyPush("/dashboard")}
        dataTestId="notFoundBackButton"
      />
    </NotFoundPageWrapper>
  );
};

NotFoundPage.propTypes = {
  historyPush: PropTypes.func.isRequired
};

export default connect(() => ({}), {
  historyPush
})(NotFoundPage);
