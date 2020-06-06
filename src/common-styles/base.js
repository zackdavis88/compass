import styled, { createGlobalStyle } from "styled-components";
import { black, white, navbarHeight } from "./variables";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  main {
    position: relative;
    left: 0;
    top: ${navbarHeight};
    width: 100%;
    height: calc(100% - ${navbarHeight});
  }

  #root {
    width: 100%;
    height: 100%;
    font-family: "Baloo 2";
    background-color: ${white};
    color: ${black};

    & * {
      box-sizing: border-box;
    }
  }

  *:focus {
    outline: none;
  }
`;

export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
