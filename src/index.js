import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./app";
import "./index.css";

const API_URL = process.env.REACT_APP_API_URL;
const client = new ApolloClient({ uri: API_URL, cache: new InMemoryCache() });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
