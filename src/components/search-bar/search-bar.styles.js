import styled, {css} from "styled-components";
import {
  black,
  black33,
  black05,
  black80,
  white,
  inputHeight,
  transparent
} from "../../common-styles/variables";
import {fadeIn} from "../../common-styles/animations";
import {ButtonWrapper} from "../button/button.styles";

export const SearchBarWrapper = styled.div`
  position: relative;

  & input {
    display: inline-block;
    background-color: ${white};
    font-size: 16px;
    font-weight: normal;
    height: ${inputHeight};
    padding-left: 20px;
    padding-right: 55px;
    color: ${black};
    width: 500px;
    border-radius: 15px;
    border: 1px solid ${black33};
    transition: border 100ms linear, background-color 100ms linear;
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
  }

  & ${ButtonWrapper} {
    margin-left: 10px;
    display: inline-block;
    animation: 100ms linear 0s 1 ${fadeIn};
  }
`;

export const ClearButton = styled.span`
  color: ${black80};
  position: absolute;
  font-size: 20px;
  left: 455px;
  line-height: 0;
  top: 8px;
  border: 1px solid ${transparent};
  background-color: ${transparent};
  padding: 4px;
  border-radius: 32px;
  transition: background-color 100ms linear;
  user-select: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${black33};
  }
`;
