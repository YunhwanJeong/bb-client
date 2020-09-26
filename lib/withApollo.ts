import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { NextPageContext } from "next";
import { getAccessToken } from "./accessToken";
import createWithApollo from "./createWithApollo";

export const isServer = () => typeof window === "undefined";

const createClient = (ctx: NextPageContext, serverAccessToken: string) => {
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
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });
  return new ApolloClient({
    ssrMode: isServer(),
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
