import styled, {css} from "styled-components";
import {
  white,
  black80,
  black1a,
  black66,
  black33,
  black99,
  primaryBlue
} from "../../common-styles/variables";

export const RadioCircle = styled.span`
  position: absolute;
  top: 3px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: ${black1a};
  border-radius: 50%;
  transition: background-color 100ms linear;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`;

export const RadioContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  &:hover input ~ ${RadioCircle} {
    background-color: ${black66};
  }

  & input:checked ~ ${RadioCircle} {
    background-color: ${primaryBlue};
  }

  & input:checked ~ ${RadioCircle}:after {
    display: block;
  }

  & ${RadioCircle}:after {
    top: 7px;
    left: 7px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${white};
  }

  ${({disabled}) => disabled && css`
    cursor: not-allowed;
    color: ${black99};

    & input {
      cursor: not-allowed;
    }

    &:hover input ~ ${RadioCircle} {
      background-color: ${black33};
    }

    & input:checked ~ ${RadioCircle}{
      background-color: ${black33};
    }

    & ${RadioCircle}:after {
      background-color: ${black99};
    }

    & ${RadioCircle} {
      background-color: ${black33};
    }
  `}
`;

export const RadioGroupWrapper = styled.div`
  ${({horizontal}) => horizontal && css`
    & ${RadioContainer} {
      display: inline-block;
      margin-left: 0;
      margin-right: 20px;
    }

    & ${RadioContainer}:last-of-type {
      margin-right: 0;
    }
  `}
`;
