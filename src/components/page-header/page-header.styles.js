import styled, { css } from "styled-components";
import { lightGrey, pageHeaderHeight } from "../../common-styles/variables";

export const PageHeaderWrapper = styled.div`
  position: relative;
  text-align: left;
  width: 100%;
  height: ${pageHeaderHeight};
  border-bottom: 1px solid ${lightGrey};
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 11px;
  word-break: break-all;
  overflow: hidden;

  ${({textCenter}) => textCenter && css`
    text-align: center;
  `}

  ${({fixedPosition}) => fixedPosition && css`
    position: fixed;
    z-index: 3000;
  `}

  & h1 {
    margin: 0;
    font-size: 35px;
    height: 100%;

    & svg {
      margin-right: 5px;
    }
  }
`;
