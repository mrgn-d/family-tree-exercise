import '../styles/globals.css'

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: "http://localhost:5000/graphql",
    fetch
  }),
  cache: new InMemoryCache()
});


function MyApp({ Component, pageProps }) {

  const apolloState = { data: {} };

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
