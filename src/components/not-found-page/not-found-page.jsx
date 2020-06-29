import React from "react";
import { NotFoundPageWrapper } from "./not-found-page.styles";
import PageHeader from "../page-header/page-header";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";

const NotFoundPage = () => {
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
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
