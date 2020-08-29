import styled, {css} from "styled-components";
import {TabsWrapper} from "../../components/tabs/tabs.styles";
import {Spinner} from "../../components/loading-spinner/loading-spinner.styles";
import {
  black,
  black80,
  pageHeaderHeight
} from "../../common-styles/variables";
import {ActionsWrapper} from "../../components/actions-menu/actions-menu.styles";
import {MarkdownTextWrapper} from "../../components/markdown-text/markdown-text.styles";
import {CheckBoxSquare} from "../../components/check-box/check-box.styles";

export const StoryDetailsWrapper = styled.div`
  position: relative;
  height: calc(100% - ${pageHeaderHeight});
  width: 100%;

  & ${TabsWrapper} {
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 50px;
    margin-right: 50px;
  }

  & ${Spinner} {
    padding-top: 35px;
  }

  & ${ActionsWrapper} {
    top: 100px;
  }
`;

export const DetailsSection = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
`;

export const DetailsBlock = styled.div`
  position: absolute;
  display: inline-block;
  width: 100%;
  color: ${black};
  border: 1px solid ${black80};
  border-radius: 5px;
  font-size: 18px;
  text-align: left;
  top: 0;
  height: 100%;
  overflow-y: auto;
  padding: 10px 25px;

  ${({width}) => width && css`
    width: ${width};
  `}
  ${({inlineLeft}) => inlineLeft && css`
    border-radius: 5px 0 0 5px;
    left: 0;
  `}
  ${({inlineRight}) => inlineRight && css`
    border-left: none;
    border-radius: 0 5px 5px 0;
    right: 0;
    padding: 20px 10px;
  `}
  ${({textCenter}) => textCenter && css`
    text-align: center;
  `}
`;

export const StoryID = styled.small`
  color: ${black80};
  letter-spacing: 1px;
  margin-bottom: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

export const StoryName = styled.div`
  margin-top: 5px;
  font-size: 25px;
  overflow: hidden;
  word-break: break-word;
`;

export const StoryDetailsBlock = styled.div`
  margin-top: 20px;
  overflow-wrap: break-word;
  white-space: pre-line;

  & ${MarkdownTextWrapper} {
    font-style: normal;

    & ${CheckBoxSquare} {
      border: none;
    }
  }

  & div {
    font-style: italic;
  }

  & span{
    user-select: none;
    color: ${black80};
    font-size: 15px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid ${black80};
    transition: color 100ms linear, border-color 100ms linear;
  }

  &:hover span {
    color: ${black};
    border-color: ${black};
  }
`;

export const SideItem = styled.div`
  position: relative;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 1.1em;

  & span{
    user-select: none;
    color: ${black80};
    font-size: 15px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid ${black80};
    transition: color 100ms linear, border-color 100ms linear;
  }

  &:hover span {
    color: ${black};
    border-color: ${black};
  }

  & a {
    color: ${black};
    text-decoration: none;

  }

  & a:hover {
    text-decoration: underline;
  }
`;

