import { from, HttpLink, ApolloLink, Observable, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { popupError } from "../components/errors";
import Cookies from "js-cookie";
import { getMainDefinition } from "@apollo/client/utilities";

const API_URL = process.env.REACT_APP_API_URL;

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: "same-origin",
});

const wsLink = new WebSocketLink({
  uri: `wss://api.birrbet.com/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const request = async (operation) => {
  const token = Cookies.getJSON("AuthData")?.token;
  // set the token in the request header for authorization
  operation.setContext({
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
      let graphQLMessge = "";
      graphQLErrors.forEach((error) => {
        if (
          error?.extensions &&
          (error?.extensions?.exception?.response?.statusCode |
            error?.extensions?.exception?.response?.status) >=
            500
        ) {
          return (graphQLMessge = "Something went wrong");
        } else {
          return (graphQLMessge = "Something went wrong");
        }
      });
      return popupError(graphQLMessge);
    }
    if (networkError) {
      console.log(networkError);
      return popupError("Connection error");
    }
  }
);

const customLink = from([errorLink, requestLink, splitLink]);

export default customLink;

// const authMiddleware = new ApolloLink((operation, forward) => {
//   const token = Cookies.getJSON("AuthData")?.token;
//   operation.setContext({
//     headers: {
//       Authorization: `bearer ${token}`,
//     },
//   });
//   return forward(operation);
// })
