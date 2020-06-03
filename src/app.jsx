import React, { Fragment } from "react";
import { GlobalStyle } from "./common-styles/base";
import Navbar from "./containers/navbar/navbar";

const CompassApp = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Navbar />
    </Fragment>
  );
};

export default CompassApp;
