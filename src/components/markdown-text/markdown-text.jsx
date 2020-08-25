import React from "react";
import PropTypes from "prop-types";
import {MarkdownTextWrapper} from "./markdown-text.styles";
import ReactMarkdown from "react-markdown";

const MarkdownText = ({dataTestId, sourceData}) => {
  return (
    <MarkdownTextWrapper data-testid={dataTestId}>
      <ReactMarkdown source={sourceData} escapeHtml={false} />
    </MarkdownTextWrapper>
  );
};

MarkdownText.propTypes = {
  dataTestId: PropTypes.string,
  sourceData: PropTypes.string.isRequired
};

export default MarkdownText;
