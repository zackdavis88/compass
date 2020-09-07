import styled from "styled-components";
import { navbarHeight, transparent } from "../../common-styles/variables";

export const NotificationWrapper = styled.div`
  background-color: ${transparent};
  position: fixed;
  min-width: 500px;
  width: 500px;
  height: 75px;
  right: 15px;
  top: calc(${navbarHeight} + 15px);
  z-index: 3000;
  overflow: hidden;
`;
