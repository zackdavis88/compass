import styled, { css } from "styled-components";
import {
  black,
  black1a,
  black26,
  black80,
  blackd5,
  white,
  transparent,
  primaryBlue,
  secondaryBlue,
  secondaryBlue1a,
  tertiaryBlue,
  tertiaryBlue26,
  primaryRed,
  secondaryRed,
  secondaryRed1a,
  tertiaryRed,
  tertiaryRed26,
  buttonHeight,
  smallButtonHeight
} from "../../common-styles/variables";
import { TooltipWrapper } from "../tooltip/tooltip.styles";

export const ButtonWrapper = styled.div`
  position: relative;

  & button {
    user-select: none;
    cursor: pointer;
    text-align: center;
    color: ${black};
    background-color: ${white};
    height: ${buttonHeight};
    font-size: 18px;
    font-weight: 500;
    border: 2px solid ${transparent};
    border-radius: 32px;
    padding: 10px 20px;
    box-shadow: none;
    transition: border 100ms linear, color 100ms linear, background-color 100ms linear;
    ${({small}) => small && css`
      height: ${smallButtonHeight};
      font-size: 16px;
      padding: 4px 20px;
    `}

    ${({primary}) => primary && css`
      color: ${white};
      background-color: ${primaryBlue};
    `}

    ${({secondary}) => secondary && css`
      color: ${primaryBlue};
      background-color: ${white};
      border-color: ${primaryBlue};
    `}

    ${({primary, danger}) => danger && primary && css`
      color: ${white};
      background-color: ${primaryRed};
    `}

    ${({secondary, danger}) => danger && secondary && css`
      color: ${primaryRed};
      background-color: ${white};
      border-color: ${primaryRed};
  `}
  }

  & button:hover {
    background-color: ${black1a};
    ${({primary}) => primary && css`
      background-color: ${secondaryBlue};
    `}

    ${({secondary}) => secondary && css`
      color: ${secondaryBlue};
      background-color: ${secondaryBlue1a};
      border-color: ${secondaryBlue};
    `}

    ${({primary, danger}) => danger && primary && css`
      background-color: ${secondaryRed};
    `}

    ${({secondary, danger}) => danger && secondary && css`
      color: ${secondaryRed};
      background-color: ${secondaryRed1a};
      border-color: ${secondaryRed};
    `}
  }

  & button:active {
    background-color: ${black26};
    ${({primary}) => primary && css`
      background-color: ${tertiaryBlue};
    `}

    ${({secondary}) => secondary && css`
      color: ${tertiaryBlue};
      border-color: ${tertiaryBlue};
      background-color: ${tertiaryBlue26};
    `}

    ${({primary, danger}) => danger && primary && css`
      background-color: ${tertiaryRed};
    `}

    ${({secondary, danger}) => danger && secondary && css`
      color: ${tertiaryRed};
      background-color: ${tertiaryRed26};
      border-color: ${tertiaryRed};
    `}
  }

  & button:disabled {
    cursor: not-allowed;
    color: ${blackd5};
    border-color: ${black80};
    background-color: ${black1a};
  }

  & button svg {
    margin-right: 5px;
  }

  & ${TooltipWrapper} {
    ${({small}) => small ? css`
      top: calc(${smallButtonHeight} + 3px);
    ` : css`
      top: calc(${buttonHeight} + 3px);
    `}
  }
  
  & button:hover + ${TooltipWrapper} {
    visibility: visible;
    opacity: 1;
  }
`;
