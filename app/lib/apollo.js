import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const uri = "https://karlsbarbershop.com/graphql";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error("gql error", message, locations, path)
    );

  if (networkError) console.error("network error", networkError);
});

const link = from([errorLink, new HttpLink({ uri })]);

export const client = new ApolloClient({
  uri,
  link,
  cache: new InMemoryCache(),
});
