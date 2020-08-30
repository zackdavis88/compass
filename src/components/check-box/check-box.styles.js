import styled, {css} from "styled-components";
import {
  black1a,
  black33,
  black66,
  black99,
  primaryBlue,
  white
} from "../../common-styles/variables";

export const CheckBoxSquare = styled.span`
  position: absolute;
  top: 3px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: ${black1a};
  transition: background-color 100ms linear;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`;

export const CheckBoxWrapper = styled.label`
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  ${({strikeText}) => strikeText && css`
    text-decoration: line-through;
  `}
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  &:hover input ~ ${CheckBoxSquare} {
    background-color: ${black66};
  }

  & input:checked ~ ${CheckBoxSquare} {
    background-color: ${primaryBlue};
  }

  & input:checked ~ ${CheckBoxSquare}:after {
    display: block;
  }

  & ${CheckBoxSquare}:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid ${white};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  ${({disabled}) => disabled && css`
  cursor: not-allowed;
  color: ${black99};

  & input {
    cursor: not-allowed;
  }

  &:hover input ~ ${CheckBoxSquare} {
    background-color: ${black33};
  }

  & input:checked ~ ${CheckBoxSquare}{
    background-color: ${black33};
  }

  & ${CheckBoxSquare} {
    background-color: ${black33};
  }
`}
`;
