import styled, { css } from "styled-components";
import { 
  primaryRed,
  white,
  black,
  black33,
  black80,
  black0d,
  black05,
  inputHeight
} from "../../common-styles/variables";
import { fadeIn } from "../../common-styles/animations";

//TODO: Making margin-bottom dynamic based on the amount of characters in helperText.
//      Each line of text is 24px height. margin-bottom: calc(Math.ceil(helperText.length / CHAR_PER_LINE));
export const InputBoxWrapper = styled.div`
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
