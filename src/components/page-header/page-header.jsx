import React from "react";
import PropTypes from "prop-types";
import { PageHeaderWrapper } from "./page-header.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageHeader = ({text, icon, textCenter, fixedPosition, dataTestId}) => {
  return (
    <PageHeaderWrapper data-testid={dataTestId} textCenter={textCenter} fixedPosition={fixedPosition}>
      <h1>
        {icon && <FontAwesomeIcon data-testid="pageHeaderIcon" icon={icon} fixedWidth/>}
        {text}
      </h1>
    </PageHeaderWrapper>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object,
  textCenter: PropTypes.bool,
  fixedPosition: PropTypes.bool,
  dataTestId: PropTypes.string
};

export default PageHeader;
