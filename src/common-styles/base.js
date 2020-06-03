import { createGlobalStyle } from "styled-components";
import { black, white } from "./variables";

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