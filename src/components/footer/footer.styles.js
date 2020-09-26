import styled from "styled-components";
import {footerHeight, black, black80, secondaryBlue1a} from "../../common-styles/variables";

export const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${footerHeight};
  border-top: 1px solid ${black80};
  background-color: ${secondaryBlue1a};
`;

export const FooterContent = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 0 25px;
  text-align: center;

  & > span {
    display: inline-block;
    line-height: calc(${footerHeight} - 1px);
    color: ${black80};
    transition: color 100ms linear;

    & > a {
      text-decoration: none;
      color: ${black80};
      transition: color 100ms linear;
      user-select: none;
      
      &:hover {
        text-decoration: underline;
      }
    }

    & > svg {
      margin: 0 15px;
    }
  }

  & > span:hover {
    color: ${black};
    & > a {
      color: ${black};
    }
  }

  & > span:first-of-type {
    float: left;
    text-align: left;
    letter-spacing: 1px;
  }

  & > span:last-of-type {
    float: right;
    text-align: right;
    letter-spacing: 1px;
  }
`;
