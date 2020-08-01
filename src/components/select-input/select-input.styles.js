import styled, { css } from "styled-components";
import { 
  primaryRed,
  white,
  black,
  black1a,
  black26,
  black33,
  black80,
  black0d,
  black05,
  inputHeight
} from "../../common-styles/variables";
import { fadeIn } from "../../common-styles/animations";

export const SelectInputWrapper = styled.div`
  position: relative;
  transition: margin 100ms linear;
  overflow: visible;

  ${({helperVisible}) => helperVisible && css`
    margin-bottom: 35px !important;
  `}

  & input {
    background-color: ${white};
    font-size: 16px;
    font-weight: normal;
    height: ${inputHeight};
    padding-left: 20px;
    padding-right: 20px;
    color: ${black};
    border-radius: 32px;
    border: 1px solid ${black33};
    width: 100%;
    transition: border 100ms linear, background-color 100ms linear;
    ${({hasError}) => hasError && css`
      border-color: ${primaryRed} !important;
    `}
  }

  & input::placeholder {
    user-select: none;
  }

  & input:focus {
    border: 1px solid ${black80};
  }

  & input:hover {
    border: 1px solid ${black33};
    background-color: ${black05};
    ${({hasValue}) => hasValue && css`
      background-color: ${white};
    `}
  }

  & input:disabled {
    cursor: not-allowed;
    color: ${black};
    background-color: ${black0d};
    border-color: ${black80};
  }

  & input:focus:hover {
    background-color: ${white};
    border: 1px solid ${black80};
  }

  & label {
    color: ${black};
    position: absolute;
    padding-left: 3px;
    padding-right: 3px;
    top: -13px;
    left: 17px;
    background-color: ${white};
    font-size: 15px;
    font-weight: bold;
    user-select: none;
    animation: 100ms linear 0s 1 ${fadeIn};

    ${({hasError}) => hasError && css`
      color: ${primaryRed};
    `}
  }

  & div {
    color: ${black};
    position: absolute;
    left: 20px;
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
    top: 10px;
    right: 20px;
  }
`;

export const FlyoutWrapper = styled.div`
  position: absolute;
  border-radius: 4px;
  line-height: 1;
  border: 1px solid ${black80};
  border-top: none;
  border-radius: 0 0 5px 5px;
  top: calc(${inputHeight});
  left: 0;
  width: calc(100% - 40px);
  height: auto;
  background-color: ${white};
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 5px;
  padding-right: 5px;
  height: auto;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 7001;
`;

export const FlyoutItem = styled.li`
  user-select: none;
  cursor: pointer;
  font-size: 18px;
  padding: 8px;
  color: ${black};
  border: 1px solid ${white};
  border-radius: 5px;
  transition: background-color 125ms linear;

  &:hover {
    background-color: ${black1a};
  }

  &:active {
    background-color: ${black26};
  }
`;

export const FlyoutItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
`;