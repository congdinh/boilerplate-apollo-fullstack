import React, { Component } from "react";
import Body from "./Body";
import Hero from "./Hero";
import withGlobalStyles from "../utilities/styles/global";
@withGlobalStyles
class App extends Component {
  render() {
    return (
      <Body>
        <Hero />
      </Body>
    );
  }
}

export default App;
