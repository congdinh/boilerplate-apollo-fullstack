// The src/index.js file

import React from "react";
import ReactDom from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./components/App";

require("dotenv").config();
console.log("process.env: ", process.env.NODE_ENV);

const env = process.env.NODE_ENV;

const url =
  (env === "production" && `${process.env.APOLLO_PATH}`) ||
  `http://localhost:${process.env.PORT}${process.env.APOLLO_PATH}`;
const client = new ApolloClient({
  uri: url
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDom.render(<Root />, document.getElementById("root"));
