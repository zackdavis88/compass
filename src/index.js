import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledWrapper = styled.div``;

const CompassApp = (props) => (
  <StyledWrapper>
    Hello, World!
  </StyledWrapper>
);

ReactDOM.render(<CompassApp />, document.getElementById("root"));
