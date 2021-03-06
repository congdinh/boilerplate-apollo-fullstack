import React, { Component } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import THEME from "./theme";
import NORMALIZE from "./normalize";
import TYPOGRAPHY from "./typography";

const Styles = createGlobalStyle`
  ${NORMALIZE}
  ${TYPOGRAPHY}

  * {
    box-sizing: border-box;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const withGlobalStyles = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <ThemeProvider theme={THEME}>
          <>
            <Styles />
            <WrappedComponent {...this.props} />
          </>
        </ThemeProvider>
      );
    }
  };
};

export default withGlobalStyles;
