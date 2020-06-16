import styled from "styled-components";
import { black, white } from "../../common-styles/variables";

export const TooltipWrapper = styled.div`
  text-align: center;
  border-radius: 5px;
  position: absolute;
  padding-left: 5px;
  padding-right: 5px;
  white-space: nowrap;
  background-color: ${black} !important;
  color: ${white} !important;
  opacity: 0;
  visibility: hidden;
  transition: opacity 200ms linear;
  z-index: 2008;
`;
