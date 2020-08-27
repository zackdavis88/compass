import styled, {css} from "styled-components";
import {
  black, 
  black33, 
  black80, 
  black05, 
  black0d, 
  white, 
  primaryRed, 
  textAreaHeight
} from "../../common-styles/variables";
import {fadeIn} from "../../common-styles/animations";

export const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;

  & textarea {
    background-color: ${white};
    color: ${black};
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: ${textAreaHeight};
    height: ${textAreaHeight};
    max-height: 10em;
    border-radius: 5px;
    font-size: 16px;
    font-stretch: 100%;
    font-weight: 400;
    font-family: "Arial";
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid ${black33};
    resize: vertical;
    transition: border-color 100ms linear, background-color 100ms linear;
    ${({hasError}) => hasError && css`
      border-color: ${primaryRed} !important;
    `}
  }

  & textarea::placeholder {
    user-select: none;
  }

  & textarea:focus {
    border: 1px solid ${black80};
  }

  & textarea:hover {
    border: 1px solid ${black33};
    background-color: ${black05};
    ${({hasValue}) => hasValue && css`
      background-color: ${white};
    `}
  }

  & textarea:disabled {
    cursor: not-allowed;
    color: ${black};
    background-color: ${black0d};
    border-color: ${black80};
  }

  & textarea:focus:hover {
    background-color: ${white};
    border: 1px solid ${black80};
  }

  & label {
    color: ${black};
    position: absolute;
    padding-left: 3px;
    padding-right: 3px;
    top: -10px;
    left: 10px;
    background-color: ${white};
    font-size: 15px;
    font-weight: bold;
    user-select: none;
    animation: 100ms linear 0s 1 ${fadeIn};
    line-height: 11px;

    ${({hasError}) => hasError && css`
      color: ${primaryRed};
    `}
  }

  & div {
    position: relative;
    display: inline-block;
    top: -0.6em;
    color: ${black};
    margin-left: 13px;
    text-align: left;
    font-size: 15px;
    animation: 100ms linear 0s 1 ${fadeIn};

    ${({hasError}) => hasError && css`
      color: ${primaryRed};
    `}
  }

  & span {
    user-select: none;
    color: ${black80};
    font-style: italic;
    position: absolute;
    top: 5px;
    right: 20px;
    cursor: text;
  }
`;
