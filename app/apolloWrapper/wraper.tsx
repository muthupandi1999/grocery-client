// "use client";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

// const createApolloClient = () => {
//   return new ApolloClient({
//     uri: "http://192.168.7.49:5000/graphql",
//     cache: new InMemoryCache(),
//   });
// };
// // you need to create a component to wrap your app in
// export function ApolloWrapper({ children }: Readonly<React.PropsWithChildren>) {
//   return (
//     <ApolloNextAppProvider  makeClient={createApolloClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }

// "use client"
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   NextSSRApolloClient ,
//   NextSSRInMemoryCache
// } from "@apollo/experimental-nextjs-app-support/ssr";

// const createApolloClient = () => {
//     return new NextSSRApolloClient({
//       uri: "http://192.168.7.49:5000/graphql",
//       cache: new NextSSRInMemoryCache (),
//     });
//   };
// // you need to create a component to wrap your app in
// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return (
//     <ApolloNextAppProvider makeClient={createApolloClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }

// Worrking

"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";

import { onError } from "@apollo/client/link/error";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import toast, { Toaster } from "react-hot-toast";
// import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";
const httpLink = new HttpLink({
  uri: "http://192.168.7.49:5000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://192.168.7.49:5000/graphql",
  })
);

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }: any) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      toast.error(message);
    });
  }
  // if (networkError) {
  //   console.error(`[Network error]: ${networkError}`);
  // }
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

const createApolloClient = () => {
  return new NextSSRApolloClient({
    link: errorLink.concat(splitLink),
    cache: new NextSSRInMemoryCache()
  });
};
// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <ApolloNextAppProvider makeClient={createApolloClient}>
      <Toaster position="top-center" />
      {children}
    </ApolloNextAppProvider>
  );
}


//New

// import { ApolloLink, HttpLink } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   NextSSRInMemoryCache,
//   NextSSRApolloClient,
//   SSRMultipartLink,
// } from "@apollo/experimental-nextjs-app-support/ssr";
// import { WebSocketLink } from "@apollo/client/link/ws";

// // Function to create an Apollo Client
// function makeClient() {
//   const httpLink = new HttpLink({
//     uri: "http://192.168.7.49:5000/graphql",
//     fetchOptions: { cache: "no-store" },
//   });

//   const wsLink = new WebSocketLink({
//     uri: "ws://192.168.7.49:5000/graphql", // WebSocket URL for subscriptions
//     options: {
//       reconnect: true,
//     },
//   });

//   const terminatingLink = ApolloLink.split(
//     // Splitting based on operation type (queries/mutations vs. subscriptions)
//     (operation) => {
//       const definition = operation.query.definitions[0];
//       return (
//         definition.kind === "OperationDefinition" &&
//         definition.operation === "subscription"
//       );
//     },
//     wsLink, // Use WebSocket link for subscriptions
//     httpLink // Use HTTP link for queries and mutations
//   );

//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link:
//       typeof window === "undefined"
//         ? ApolloLink.from([
//             new SSRMultipartLink({
//               stripDefer: true,
//             }),
//             terminatingLink, // Use the terminating link combining WebSocket and HTTP
//           ])
//         : httpLink,
//   });
// }

// // Component to wrap the app with Apollo Client
// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return (
//     <ApolloNextAppProvider makeClient={makeClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }
