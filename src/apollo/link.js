import { from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { popupError } from "../components/errors";

const API_URL = process.env.REACT_APP_API_URL;

const httpLink = new HttpLink({ uri: API_URL, credentials: "include" });

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors) {
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
      return popupError("Connection error");
    }
  }
);

const customLink = from([errorLink, httpLink]);

export default customLink;
