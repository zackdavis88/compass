/* I did not make/design this component!! 
   Googled for a pure CSS loader and found this code here: https://loading.io/css/
   I have converted the pure CSS/HTML example to a React Component.
*/
import styled, {css} from "styled-components";
import {fullRotate} from "../../common-styles/animations";
import {brandBlue} from "../../common-styles/variables";

export const LoadingSpinnerWrapper = styled.div`
  ${({alignCenter}) => alignCenter && css`
    text-align: center;
  `}
`;
export const SpinnerDot = styled.div``;
export const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  box-sizing: content-box !important;

  & ${SpinnerDot} {
    animation: ${fullRotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  & ${SpinnerDot}:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${brandBlue};
    margin: -4px 0 0 -4px;
  }
  & ${SpinnerDot}:nth-child(1) {
    animation-delay: -0.036s;
  }
  & ${SpinnerDot}:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  & ${SpinnerDot}:nth-child(2) {
    animation-delay: -0.072s;
  }
  & ${SpinnerDot}:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  & ${SpinnerDot}:nth-child(3) {
    animation-delay: -0.108s;
  }
  & ${SpinnerDot}:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  & ${SpinnerDot}:nth-child(4) {
    animation-delay: -0.144s;
  }
  & ${SpinnerDot}:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  & ${SpinnerDot}:nth-child(5) {
    animation-delay: -0.18s;
  }
  & ${SpinnerDot}:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  & ${SpinnerDot}:nth-child(6) {
    animation-delay: -0.216s;
  }
  & ${SpinnerDot}:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  & ${SpinnerDot}:nth-child(7) {
    animation-delay: -0.252s;
  }
  & ${SpinnerDot}:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  & ${SpinnerDot}:nth-child(8) {
    animation-delay: -0.288s;
  }
  & ${SpinnerDot}:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
`;
