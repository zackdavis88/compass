import React from "react";
import PropTypes from "prop-types";
import {MarkdownTextWrapper} from "./markdown-text.styles";
import ReactMarkdown from "react-markdown";
import {listItem as defaultListItem} from 'react-markdown/lib/renderers';
import CheckBox from "../check-box/check-box";
const markdownChecked = "- [x]";
const markdownUnchecked = "- [ ]";

const MarkdownText = ({dataTestId, sourceData, updateMarkdown}) => {
  const renderListItem = props => {
    if (typeof props.checked === "boolean" && updateMarkdown) {
      const { checked, sourcePosition } = props;
      const label = props.children[0].props.value;
      const _onChange = () => {
        const lineIndex = sourcePosition.start.line - 1;
        const lines = sourceData.split("\n");
        const find = checked ? markdownChecked : markdownUnchecked;
        const replace = checked ? markdownUnchecked : markdownChecked;
        lines[lineIndex] = lines[lineIndex].replace(find, replace);
        updateMarkdown(lines.join("\n"));
      };
      return (
        <li key={props.index}>
          <CheckBox label={label} checked={checked} onChange={_onChange} dataTestId={`markdownCheckbox.${props.index}`} />
        </li>
      );
    }
    return defaultListItem(props);
  };
  return (
    <MarkdownTextWrapper data-testid={dataTestId}>
      <ReactMarkdown 
        source={sourceData}
        rawSourcePos={true}
        escapeHtml={false}
        renderers={{listItem: renderListItem}}
      />
    </MarkdownTextWrapper>
  );
};

MarkdownText.propTypes = {
  dataTestId: PropTypes.string,
  sourceData: PropTypes.string.isRequired,
  updateMarkdown: PropTypes.func
};

export default MarkdownText;
