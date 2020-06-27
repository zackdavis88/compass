import styled from "styled-components";
import { navbarHeight } from "../../common-styles/variables";

export const MainWrapper = styled.main`
  position: relative;
  left: 0;
  top: ${navbarHeight};
  width: 100%;
  height: calc(100% - ${navbarHeight});
`;
