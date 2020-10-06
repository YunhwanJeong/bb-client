import React from "react";
import App from "next/app";
import Head from "next/head";
import cookie from "cookie";

import { ApolloProvider } from "@apollo/client";
import { isServer } from "./isServer";
import { getAccessToken, setAccessToken } from "./accessToken";

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient = null;

/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */
export const initOnContext = (ac, ctx) => {
  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === "development") {
    if (inAppContext) {
      console.warn(
        "Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n" +
          "Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n"
      );
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(ac, ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
const initApolloClient = (
  apolloClient,
  initialState,
  ctx,
  serverAccessToken
) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApolloClient(
      apolloClient(ctx, serverAccessToken),
      initialState,
      ctx
    );
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(
      apolloClient(ctx, serverAccessToken),
      initialState,
      ctx
    );
  }

  return globalApolloClient;
};

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */

function createApolloClient(apolloClient, initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  apolloClient.ssrMode = Boolean(ctx);
  apolloClient.cache.restore(initialState);

  return apolloClient;
}

export default function createWithApollo(ac) {
  return ({ ssr = false } = {}) => (PageComponent) => {
    const WithApollo = ({
      apolloClient,
      apolloState,
      serverAccessToken,
      ...pageProps
    }) => {
      let client;
      if (apolloClient) {
        // Happens on: getDataFromTree & next.js ssr
        client = apolloClient;
      } else {
        // Happens on: next.js csr
        client = initApolloClient(
          ac,
          apolloState,
          undefined,
          serverAccessToken
        );
      }

      if (!isServer() && !getAccessToken()) {
        setAccessToken(serverAccessToken);
      }

      return (
        <ApolloProvider client={client}>
          <PageComponent {...pageProps} />
        </ApolloProvider>
      );
    };

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== "production") {
      const displayName =
        PageComponent.displayName || PageComponent.name || "Component";
      WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps = async (ctx) => {
        const inAppContext = Boolean(ctx.ctx);
        const { apolloClient } = initOnContext(ac, ctx);

        // silent refresh
        let serverAccessToken = "";
        const { req } = ctx;

        if (isServer() && req.headers.cookie) {
          const cookies = cookie.parse(req.headers.cookie);
          if (cookies.dami) {
            const response = await fetch(
              "http://localhost:4000/auth/refresh-token",
              {
                method: "POST",
                credentials: "include",
                headers: {
                  cookie: "dami=" + cookies.dami,
                },
              }
            );
            const { ok, code, accessToken } = await response.json();
            serverAccessToken = accessToken;
          }
        }

        // Run wrapped getInitialProps methods
        let pageProps = {};
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx);
        } else if (inAppContext) {
          pageProps = await App.getInitialProps(ctx);
        }

        // Only on the server:
        if (isServer()) {
          const { AppTree } = ctx;
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res && ctx.res.finished) {
            return pageProps;
          }

          // Only if dataFromTree is enabled
          if (ssr && AppTree) {
            try {
              // Import `@apollo/react-ssr` dynamically.
              // We don't want to have this in our client bundle.
              const { getDataFromTree } = await import(
                "@apollo/client/react/ssr"
              );

              // Since AppComponents and PageComponents have different context types
              // we need to modify their props a little.
              let props;
              if (inAppContext) {
                props = { ...pageProps, apolloClient };
              } else {
                props = { pageProps: { ...pageProps, apolloClient } };
              }

              // Take the Next.js AppTree, determine which queries are needed to render,
              // and fetch them. This method can be pretty slow since it renders
              // your entire AppTree once for every query. Check out apollo fragments
              // if you want to reduce the number of rerenders.
              // https://www.apollographql.com/docs/react/data/fragments/
              await getDataFromTree(<AppTree {...props} />);
            } catch (error) {
              // Prevent Apollo Client GraphQL errors from crashing SSR.
              // Handle them in components via the data.error prop:
              // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
              console.error("Error while running `getDataFromTree`", error);
            }

            // getDataFromTree does not call componentWillUnmount
            // head side effect therefore need to be cleared manually
            Head.rewind();
          }
        }

        return {
          ...pageProps,
          // Extract query data from the Apollo store
          apolloState: apolloClient.cache.extract(),
          // Provide the client for ssr. As soon as this payload
          // gets JSON.stringified it will remove itself.
          apolloClient: ctx.apolloClient,
          serverAccessToken,
        };
      };
    }

    return WithApollo;
  };
}
