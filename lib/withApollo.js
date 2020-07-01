import Head from 'next/head';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export function withApollo(PageComponent) {

  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {

    // 1. create apollo client
    const client = apolloClient || initApolloClient(apolloState);

    return (
    // 2. apollo provider wrapping the PageComponent
    // connect API to front-end 
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }


  // get data ready to work with SSR
  WithApollo.getInitialProps = async (context) => {
    const { AppTree } = context;
    const apolloClient = (context.apolloClient = initApolloClient())

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(context)
    }

    // when we are on the SERVER
    if (typeof window === "undefined") {
      if ( context.res && context.res.finished) {
        return pageProps
      }

      try {
        // get all our app data before application has rendered
        const { getDataFromTree} = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree 
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        )
        
      } catch (error) {
        console.log(error);
      }

      // head side effect is cleared
      Head.rewind();

    }
    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState
    }
  }

  return WithApollo;
} 

const initApolloClient = (initialState = {}) => {
  const ssrMode = typeof window === 'undefined';
  const cache =  new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    ssrMode,
    uri: 'http://localhost:3000/api/graphql',
    cache,
  });
  return client;
}