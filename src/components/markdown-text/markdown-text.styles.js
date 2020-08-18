import styled from "styled-components";
import {
  black1a
} from "../../common-styles/variables";
export const MarkdownTextWrapper = styled.div`
  position: relative;

  & code {
    padding: .2em .4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27,31,35,.05);
    background-color: ${black1a};
    border-radius: 5px;
  }

  & pre {
    word-wrap: normal;
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: ${black1a};
    border-radius: 5px;

    & code {
      display: inline;
      padding: 0;
      margin: 0;
      overflow: visible;
      line-height: inherit;
      word-wrap: normal;
      background-color: initial;
      border: 0;
    }
  }
`;
