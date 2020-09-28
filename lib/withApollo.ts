import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { NextPageContext } from "next";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwt_decode from "jwt-decode";
import { getAccessToken, setAccessToken } from "./accessToken";
import createWithApollo from "./createWithApollo";

export const isServer = () => typeof window === "undefined";

const createClient = (ctx: NextPageContext, serverAccessToken: string) => {
  const tokenRefreshMiddleware = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();
      if (!token) return true;
      try {
        const { exp } = jwt_decode(token);
        if (Date.now() / 1000 >= exp) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch("http://localhost:4000/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Please try relogin");
      console.error(err);
    },
  });
  const authMiddleware = new ApolloLink((operation, forward) => {
    const accessToken = isServer() ? serverAccessToken : getAccessToken();
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: "bearer " + accessToken,
      },
    }));
    return forward(operation);
  });
  const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
    console.error(graphQLErrors);
    console.error(networkError);
  });
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  return new ApolloClient({
    ssrMode: isServer(),
    link: ApolloLink.from([
      tokenRefreshMiddleware,
      authMiddleware,
      errorMiddleware,
      httpLink,
    ]),
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
