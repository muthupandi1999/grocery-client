"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";



const createApolloClient = () => {
  
  return new ApolloClient({
    uri: "http://192.168.7.68:5000/graphql",
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache", // You can set your preferred fetch policy here
      },
      query: {
        fetchPolicy: "no-cache", // You can set your preferred fetch policy here
      },
    },
    headers: {
      // authorization: "Helloo",
      authorization: `Bearer ${localStorage?.getItem("token")}` || "",
    },
  });
};
// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={createApolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

// "use client";
// import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   NextSSRApolloClient,
//   NextSSRInMemoryCache,
// } from "@apollo/experimental-nextjs-app-support/ssr";

// import { onError } from "@apollo/client/link/error";
// import { split, HttpLink } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import  { ToastContainer, toast } from "react-toastify";
// // import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";
// const httpLink = new HttpLink({
//   uri: "http://192.168.7.68:5000/graphql",
// });

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://192.168.7.68:5000/graphql",
//   })
// );

// const errorLink = onError(({ graphQLErrors, networkError }: any) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }: any) => {
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );

//       // toast.error(message);
//     });
//   }
//   // if (networkError) {
//   //   console.error(`[Network error]: ${networkError}`);
//   // }
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// const createApolloClient = () => {
//   let localStorage:any;

//   const token = JSON.parse(localStorage.getItem("token" ))?.accessToken;
//   const authLink = new ApolloLink((operation, forward) => {

//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : '',
//       },
//     });

//     return forward(operation);
//   });

//   const client = new ApolloClient({
//     link: ApolloLink.from([errorLink, authLink, splitLink]),
//     cache: new InMemoryCache(),
//   });

//   return client;
// };

// export function ApolloWrapper({ children }: Readonly<React.PropsWithChildren>) {
//   const client = createApolloClient();

//   return (
//     <ApolloProvider client={client}>
//       <ToastContainer position="top-center" />
//       {children}
//     </ApolloProvider>
//   );
// }
